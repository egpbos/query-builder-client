import { childrenReceived }  from './childrenReceived';
import { childrenRequested } from './childrenRequested';

export const childrenRequestedThunk = (dispatch: any, id: number) => {
    const handleTheStatus = (response: Response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error when trying to retrieve the data. ' +
                'status text: \"' + response.statusText + '".');
        }
    };
    const handleTheData = (dbrecords: any) => {
        dispatch(childrenReceived(dbrecords));
    };
    const handleAnyErrors = (err: Error) => {
        throw new Error('Errors occured.' + err.message + err.stack);
    };

    dispatch(childrenRequested(id));

    const url: string = 'http://localhost:5000/node/' + id.toString() + '/children';

    fetch(url, {method: 'get'})
            .then(handleTheStatus)
            .then(handleTheData)
            .catch(handleAnyErrors);

};

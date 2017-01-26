import { Dispatch }                             from 'redux';

import { IGenericAction }                       from '../actions';
import { storeQuery }                           from './storeQuery';

export interface IDatabaseNumberRecord {
    myID: number;
}

export const storeQueryThunk = (username: string, query: string) => {
    return (dispatch: Dispatch<IGenericAction>) => {
        const handleTheStatus = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error when trying to send the data. ' +
                    'status text: \"' + response.statusText + '".');
            }
        };

        const handleAnyErrors = (err : Error) => {
            throw new Error('Errors occured. ' + err.message + err.stack);
        };

        dispatch(storeQuery(username, query));

        const url: string = 'http://localhost:5000/addquery/';

        const querydata = JSON.stringify({
            username,
            query
        });

        fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: querydata
        }).then(handleTheStatus)
            .catch(handleAnyErrors);
    };
};

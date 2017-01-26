import { Dispatch }                             from 'redux';

import { IGenericAction }                       from '../actions';
import { getDaemonStatus }                      from './getDaemonStatus';
import { getDaemonStatusResultReceived }        from './getDaemonStatusResultReceived';

export const getDaemonStatusThunk = () => {
    return (dispatch: Dispatch<IGenericAction>) => {
        const handleTheStatus = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error when contacting the query daemon. ' +
                    'status text: \"' + response.statusText + '".');
            }
        };

        const handleTheData = (status: any) => {
            dispatch(getDaemonStatusResultReceived(status));
        };

        const handleAnyErrors = (err: Error) => {
            dispatch(getDaemonStatusResultReceived(err.message));
        };

        dispatch(getDaemonStatus());

        const myurl: string = 'http://localhost:4567/status';

        fetch(myurl, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};

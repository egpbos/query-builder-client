import { Dispatch }                             from 'redux';

import { IGenericAction }                       from '../actions';
import { getDaemonStatus }                      from './getDaemonStatus';
import { getDaemonStatusResultReceived }        from './getDaemonStatusResultReceived';

export const getDaemonStatusThunk = (url: string, port: number) => {
    return (dispatch: Dispatch<IGenericAction>) => {
        const handleTheStatus = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error when contacting the query daemon. ' +
                    'status text: \"' + response.statusText + '".');
            }
        };

        const handleTheData = (response: Response) => {
            dispatch(getDaemonStatusResultReceived(response.statusText));
        };

        const handleAnyErrors = (err: Error) => {
            dispatch(getDaemonStatusResultReceived(err.message));
        };

        dispatch(getDaemonStatus(url, port));

        const myurl: string = url + ':' + port.toString() + '/status';

        fetch(myurl, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};

import { GET_DAEMON_STATUS_RESULT_RECEIVED }    from './authorized-actions';

export const getDaemonStatusResultReceived = (message: string) => {
    return {
        type: GET_DAEMON_STATUS_RESULT_RECEIVED,
        payload: { message }
    };
};

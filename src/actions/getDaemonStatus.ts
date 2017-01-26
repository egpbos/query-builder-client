import { GET_DAEMON_STATUS }    from './authorized-actions';

export const getDaemonStatus = () => {
    return {
        type: GET_DAEMON_STATUS,
        payload: { }
    };
};

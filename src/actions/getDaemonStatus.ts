import { GET_DAEMON_STATUS }    from './authorized-actions';

export const getDaemonStatus = (url: string, port: number) => {
    return {
        type: GET_DAEMON_STATUS,
        payload: { url, port }
    };
};

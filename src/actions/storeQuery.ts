import { STORE_QUERY }    from './authorized-actions';

export const storeQuery = (username: string, query : string) => {
    return {
        type: STORE_QUERY,
        payload: { username, query }
    };
};

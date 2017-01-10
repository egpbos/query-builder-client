import { STORE_QUERY }    from './authorized-actions';

export const storeQuery = () => {
    return {
        type: STORE_QUERY,
        payload: { }
    };
};

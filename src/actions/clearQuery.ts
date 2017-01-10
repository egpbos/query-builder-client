import { CLEAR_QUERY }    from './authorized-actions';

export const clearQuery = () => {
    return {
        type: CLEAR_QUERY,
        payload: {}
    };
};

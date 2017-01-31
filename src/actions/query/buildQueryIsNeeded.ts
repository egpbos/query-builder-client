import { BUILD_QUERY_IS_NEEDED }    from '../authorized-actions';

export const buildQueryIsNeeded = () => {
    return {
        type: BUILD_QUERY_IS_NEEDED,
        payload: {}
    };
};

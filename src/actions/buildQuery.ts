import { BUILD_QUERY }    from './authorized-actions';

export const buildQuery = () => {
    return {
        type: BUILD_QUERY,
        payload: {}
    };
};

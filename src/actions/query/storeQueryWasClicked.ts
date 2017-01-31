import { STORE_QUERY_WAS_CLICKED }    from '../authorized-actions';

export const storeQueryWasClicked = () => {
    return {
        type: STORE_QUERY_WAS_CLICKED,
        payload: { }
    };
};

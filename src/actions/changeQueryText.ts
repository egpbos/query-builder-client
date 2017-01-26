import { CHANGE_QUERY_TEXT }    from './authorized-actions';

export const changeQueryText = (newtext: string) => {
    return {
        type: CHANGE_QUERY_TEXT,
        payload: { newtext }
    };
};

import { TEXT_SEARCH_RESULT_RECEIVED }    from '../authorized-actions';

export const textSearchResultReceived = (table: string, nodes: number[]) => {
    return {
        type: TEXT_SEARCH_RESULT_RECEIVED,
        payload: { table, nodes }
    };
};

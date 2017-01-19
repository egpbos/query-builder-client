import { TEXT_SEARCH }    from './authorized-actions';

export const textSearch = (table: string, input: string) => {
    return {
        type: TEXT_SEARCH,
        payload: { table, input }
    };
};

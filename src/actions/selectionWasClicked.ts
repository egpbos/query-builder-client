import { SELECTION_WAS_CLICKED } from './authorized-actions';

export const selectionWasClicked = (table: string, id: number) => {
    return {
        type: SELECTION_WAS_CLICKED,
        payload: { table, id }
    };
};

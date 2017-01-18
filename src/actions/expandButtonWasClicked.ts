import { EXPAND_BUTTON_WAS_CLICKED } from './authorized-actions';

export const expandButtonWasClicked = (table: string, id: number) => {
    return {
        type: EXPAND_BUTTON_WAS_CLICKED,
        payload: { table, id }
    };
};

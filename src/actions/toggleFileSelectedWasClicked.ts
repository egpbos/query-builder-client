import { TOGGLE_FILE_SELECTED_WAS_CLICKED } from './authorized-actions';

export const toggleFileSelectedWasClicked = (dbid: number) => {
    return {
        type: TOGGLE_FILE_SELECTED_WAS_CLICKED,
        payload: { dbid }
    };
};

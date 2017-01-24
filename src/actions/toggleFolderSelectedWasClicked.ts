import { TOGGLE_FOLDER_SELECTED_WAS_CLICKED } from './authorized-actions';

export const toggleFolderSelectedWasClicked = (dbid: number) => {
    return {
        type: TOGGLE_FOLDER_SELECTED_WAS_CLICKED,
        payload: { dbid }
    };
};

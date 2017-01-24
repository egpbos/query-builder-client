import { COLLAPSE_FOLDER_WAS_CLICKED } from './authorized-actions';

export const collapseFolderWasClicked = (dbid: number) => {
    return {
        type: COLLAPSE_FOLDER_WAS_CLICKED,
        payload: { dbid }
    };
};

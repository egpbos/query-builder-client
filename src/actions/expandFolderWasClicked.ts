import { EXPAND_FOLDER_WAS_CLICKED } from './authorized-actions';

export const expandFolderWasClicked = (dbid: number) => {
    return {
        type: EXPAND_FOLDER_WAS_CLICKED,
        payload: { dbid }
    };
};

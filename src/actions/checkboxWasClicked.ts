import { CHECKBOX_WAS_CLICKED } from './authorized-actions';

export const checkboxWasClicked = (id: number) => {
    return {
        type: CHECKBOX_WAS_CLICKED,
        payload: { id }
    };
};

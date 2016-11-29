import { fetchChildren } from './fetchChildren';

export const fetchChildrenThunk = (id: number) => {
    return (dispatch: any) => {
        dispatch(fetchChildren(id));
    };
};

import { childrenRequested } from './childrenRequested';

export const childrenRequestedThunk = (id: number) => {
    return (dispatch: any) => {
        dispatch(childrenRequested(id));
    };
};

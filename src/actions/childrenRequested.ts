import { INode }                    from '../interfaces';
import { CHILDREN_REQUESTED } from './authorized-actions';

export const childrenRequested = (parent: INode) => {
    return {
        type: CHILDREN_REQUESTED,
        payload: { parent }
    };
};

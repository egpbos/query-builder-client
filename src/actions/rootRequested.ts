import { INode }          from '../interfaces';
import { ROOT_REQUESTED } from './authorized-actions';

export const rootRequested = (parent: INode|null) => {
    return {
        type: ROOT_REQUESTED,
        payload: { parent }
    };
};

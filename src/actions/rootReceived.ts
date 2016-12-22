import { INode } from '../components/Node';
import { ROOT_RECEIVED }  from './authorized-actions';

export const rootReceived = (table: string, root: INode) => {
    return {
        type: ROOT_RECEIVED,
        payload: { table, root }
    };
};

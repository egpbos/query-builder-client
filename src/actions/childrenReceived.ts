import { Entities }             from '../types';
import { CHILDREN_RECEIVED }    from './authorized-actions';

export const childrenReceived = (collection: string, entities: Entities) => {
    return {
        collection,
        type: CHILDREN_RECEIVED,
        payload: { entities }
    };
};

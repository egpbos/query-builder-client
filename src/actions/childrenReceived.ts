import { Entities }             from '../types';
import { CHILDREN_RECEIVED }    from './authorized-actions';

export const childrenReceived = (entities: Entities) => {
    return {
        type: CHILDREN_RECEIVED,
        payload: { entities }
    };
};

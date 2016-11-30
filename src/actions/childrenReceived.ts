import { CHILDREN_RECEIVED }  from './authorized-actions';

import { TDatabaseRecord }  from '../types';

export const childrenReceived = (dbrecords: TDatabaseRecord[]) => {
    return {
        type: CHILDREN_RECEIVED,
        payload: { dbrecords }
    };
};

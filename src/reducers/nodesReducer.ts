import 'whatwg-fetch';

import { ROOT_RECEIVED }                from '../actions';
import { ROOT_REQUESTED }               from '../actions';
import { IGenericAction }               from '../interfaces';

const initstate = {};

export const nodesReducer = (nodes: any = initstate, action: IGenericAction) => {

    console.log(new Date().toISOString().slice(11, 19), action.type);

    if (action.type === ROOT_RECEIVED) {
        //RootRequestedThunk return point
        const {root} = action.payload;
        return Object.assign({}, { [root.dbid]: root });
    } else if (action.type === ROOT_REQUESTED) {
        return nodes;
    } else {
        return nodes;
    }
};

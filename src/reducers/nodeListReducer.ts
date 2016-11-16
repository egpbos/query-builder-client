
import { Node } from '../Node';

type StateType = Node[] ;
const initialState: StateType = [];

export const nodeListReducer = (state: StateType, action: any) => {
    console.log('in reducer');
    if (state === undefined) {
        return initialState;
    } else {
        switch (action.type) {
            case 'TOGGLE_ISEXPANDED':
                return state.map((node) => {
                    if (action.payload === node.dbrecord.id) {
                        return Object.assign({}, node, {isexpanded: !node.isexpanded});
                    } else {
                        return node;
                    }
                });
            default: {
                return state;
            }
        }
    }
};

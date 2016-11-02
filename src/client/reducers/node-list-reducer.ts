
import Node from '../components/node';

type StateType = Array<Node> ;
let initialState: StateType = [];


export default function (state: StateType, action: any) {

    if (typeof state === 'undefined') {
        return initialState;
    } else {

        switch (action.type) {
            case 'TOGGLE_ISEXPANDED':
                return state.map((node) => {
                    if (action.payload === node.name) {
                        return Object.assign(node.clone(), {isexpanded: !node.isexpanded});
                    } else {
                        return node;
                    }
                });
            default: {
                return state;
            }
        }
    }
}



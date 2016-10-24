"use strict";
var entity_node_1 = require('./entity-node');
exports.entityNodeReducer = function (state, action) {
    if (state === void 0) { state = []; }
    if (action.name == 'LOAD_CHILDREN') {
        return state.map(function (n) {
            return new entity_node_1.EntityNode(n.fetch_url, n.children_count, n.instance_count, n.mention_count, n.name, n.type, n.url, n.id);
        });
    }
    else {
        return state;
    }
};
//# sourceMappingURL=entity-node.reducer.js.map
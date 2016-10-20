"use strict";
var typeshierarchy_1 = require('./typeshierarchy');
exports.typesHierarchyReducer = function (state, action) {
    if (state === void 0) { state = []; }
    if (action.name == 'LOAD_TYPES') {
        return state.data.map(function (n) {
            return new typeshierarchy_1.TypesHierarchy(n.children, n.instance_count, n.instances, n.mention_count, n.name, n.type, n.url);
        });
    }
};
//# sourceMappingURL=typeshierarchy.reducer.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var store_service_1 = require('../redux/store.service');
var EntityNodeService = (function () {
    function EntityNodeService(_store) {
        this._store = _store;
    }
    EntityNodeService.prototype.loadTreeNodes = function (root) {
        console.log(root);
        if (root.children_count > 0) {
            this._store.dispatchAction({
                name: 'LOAD_CHILDREN',
                node: {
                    fetch_url: 'children/' + root.id,
                    children_count: root.children_count,
                    instance_count: root.instance_count,
                    mention_count: root.mention_count,
                    name: root.name,
                    type: root.type,
                    url: root.url,
                    id: root.id
                }
            });
        }
    };
    EntityNodeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_service_1.ReduxStoreService])
    ], EntityNodeService);
    return EntityNodeService;
}());
exports.EntityNodeService = EntityNodeService;
//# sourceMappingURL=entity-node.service.js.map
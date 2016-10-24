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
var entity_node_1 = require('../entity-node/entity-node');
var store_service_1 = require('../redux/store.service');
var entity_node_service_1 = require('../entity-node/entity-node.service');
var TreeViewComponent = (function () {
    function TreeViewComponent(_store, _treeNodeService) {
        this._store = _store;
        this._treeNodeService = _treeNodeService;
        this.items = [];
    }
    TreeViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._store.getTreeNodes(this.root.url).subscribe(function (res) {
            _this.items = res;
        });
        this._treeNodeService.loadTreeNodes(this.root);
    };
    TreeViewComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', entity_node_1.EntityNode)
    ], TreeViewComponent.prototype, "root", void 0);
    TreeViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lazy-tree-view',
            templateUrl: 'treeview.component.html'
        }), 
        __metadata('design:paramtypes', [store_service_1.ReduxStoreService, entity_node_service_1.EntityNodeService])
    ], TreeViewComponent);
    return TreeViewComponent;
}());
exports.TreeViewComponent = TreeViewComponent;
//# sourceMappingURL=treeview.component.js.map
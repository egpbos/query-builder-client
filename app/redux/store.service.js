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
var Subject_1 = require('rxjs/Subject');
var http_1 = require('@angular/http');
// import { TreeNode } from '../tree-node/tree-node';
// import { treeNodeReducer } from '../tree-node/tree-node-reducer';
var entity_node_reducer_1 = require('../entity-node/entity-node.reducer');
var ReduxStoreService = (function () {
    function ReduxStoreService(_http) {
        var _this = this;
        this._http = _http;
        this.dataUrl = 'http://localhost:5000/'; // URL to web api
        this.dispatcher = new Subject_1.Subject();
        this.treeNodes = {};
        this.nodes = {};
        this.dispatcher.subscribe(function (action) { return _this.handleAction(action); });
    }
    ReduxStoreService.prototype.handleAction = function (action) {
        var _this = this;
        if (action.name === 'LOAD_CHILDREN') {
            if (this.nodes[action.node.url]) {
                this.treeNodes[action.node.url].next(this.nodes[action.node.url]);
            }
            else {
                this._http
                    .get(this.dataUrl + action.node.fetch_url)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    _this.nodes[action.node.url] = entity_node_reducer_1.entityNodeReducer(res, action);
                    _this.treeNodes[action.node.url].next(_this.nodes[action.node.url]);
                });
            }
        }
    };
    ReduxStoreService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ReduxStoreService.prototype.getTreeNodes = function (url) {
        if (!this.treeNodes.hasOwnProperty(url)) {
            this.treeNodes[url] = new Subject_1.Subject();
        }
        return this.treeNodes[url].asObservable();
    };
    ReduxStoreService.prototype.dispatchAction = function (action) {
        this.dispatcher.next(action);
    };
    ReduxStoreService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReduxStoreService);
    return ReduxStoreService;
}());
exports.ReduxStoreService = ReduxStoreService;
//# sourceMappingURL=store.service.js.map
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
// import { TreeNode } from '../tree-node/tree-node';
var typeshierarchy_1 = require('../typeshierarchy/typeshierarchy');
// import { ReduxStoreService } from '../redux/store.service';
// import { TreeNodeService } from '../tree-node/tree-node.service';
var CountryDemoComponent = (function () {
    function CountryDemoComponent() {
        this.node = null;
        this.dataUrl = 'app/typeshierarchy'; // URL to web api
    }
    CountryDemoComponent.prototype.ngOnInit = function () {
        // this.node = new TreeNode('root', 'app/data/tree-view-data/countries.json', '');
        this.node = new typeshierarchy_1.TypesHierarchy(new Array(), 0, new Array(), 0, 'root', '', this.dataUrl);
    };
    CountryDemoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'country-demo',
            templateUrl: 'country-demo.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], CountryDemoComponent);
    return CountryDemoComponent;
}());
exports.CountryDemoComponent = CountryDemoComponent;
//# sourceMappingURL=country-demo.component.js.map
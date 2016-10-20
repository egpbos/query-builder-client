import { Component, Input, OnInit } from '@angular/core';
import { TypesHierarchy } from '../typeshierarchy/typeshierarchy';
import { ReduxStoreService } from '../redux/store.service';
import { TypesHierarchyService } from '../typeshierarchy/typeshierarchy.service';

@Component({
  moduleId: module.id,
  selector:'lazy-tree-view',
  templateUrl:'treeview.component.html'
})

export class TreeViewComponent implements OnInit {
  @Input() root: TypesHierarchy;

  children: any;
  items = [];
  subscription;

  constructor(private _store: ReduxStoreService, private _treeNodeService: TypesHierarchyService) {
  }

  ngOnInit() {
    this.subscription = this._store.getTreeNodes(this.root.url).subscribe(res => {
      this.items = res;
    });
    this._treeNodeService.loadTreeNodes(this.root);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
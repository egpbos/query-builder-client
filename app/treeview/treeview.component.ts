import { Component, Input, OnInit } from '@angular/core';
import { EntityNode } from '../entity-node/entity-node';
import { ReduxStoreService } from '../redux/store.service';
import { EntityNodeService } from '../entity-node/entity-node.service';

@Component({
  moduleId: module.id,
  selector:'lazy-tree-view',
  templateUrl:'treeview.component.html'
})

export class TreeViewComponent implements OnInit {
  @Input() root: EntityNode;

  children: any;
  items = [];
  subscription;

  constructor(private _store: ReduxStoreService, private _treeNodeService: EntityNodeService) {}

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
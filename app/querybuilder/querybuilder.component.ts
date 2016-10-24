import { Component } from '@angular/core';
// import { TreeNode } from '../tree-node/tree-node';
import { EntityNode } from '../entity-node/entity-node';
import { EntityInstance }  from '../entity-instance/entity-instance';
// import { ReduxStoreService } from '../redux/store.service';
// import { TreeNodeService } from '../tree-node/tree-node.service';

@Component({
  moduleId: module.id,
  // selector: 'querybuilder',
  templateUrl: 'querybuilder.component.html',
  // providers: [ReduxStoreService, TreeNodeService]
})

export class QuerybuilderComponent {
  node: EntityNode = null;

  ngOnInit() {
    // this.node = new TreeNode('root', 'app/data/tree-view-data/countries.json', '');
    this.node = new EntityNode('node/1', 1, 0, 0, '', '', '', 1);
  }
}
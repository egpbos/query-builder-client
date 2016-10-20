import { Component } from '@angular/core';
// import { TreeNode } from '../tree-node/tree-node';
import { TypesHierarchy } from '../typeshierarchy/typeshierarchy';
import { Instance }  from '../instance/instance';
// import { ReduxStoreService } from '../redux/store.service';
// import { TreeNodeService } from '../tree-node/tree-node.service';

@Component({
  moduleId: module.id,
  selector: 'country-demo',
  templateUrl: 'country-demo.component.html',
  // providers: [ReduxStoreService, TreeNodeService]
})

export class CountryDemoComponent {
  node: TypesHierarchy = null;

  private dataUrl = 'app/typeshierarchy';  // URL to web api
  

  ngOnInit() {
    // this.node = new TreeNode('root', 'app/data/tree-view-data/countries.json', '');
    this.node = new TypesHierarchy(new Array<TypesHierarchy>(), 0, new Array<Instance>(), 0, 'root', '', this.dataUrl);
  }
}
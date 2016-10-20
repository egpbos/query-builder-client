import { Injectable } from '@angular/core';
import { ReduxStoreService } from '../redux/store.service';

@Injectable()

export class TypesHierarchyService {
  constructor(private _store: ReduxStoreService) {}

  loadTreeNodes(root) {
    if (root.children !== null) {
      this._store.dispatchAction({ 
        children: root.children,
        instance_count: root.instance_count,
        instances: root.instances,
        mention_count: root.mention_count,
        name: 'LOAD_TYPES',
        type: root.type,
        url: root.url
      });
    }
  }
}
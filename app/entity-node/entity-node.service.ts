import { Injectable } from '@angular/core';
import { ReduxStoreService } from '../redux/store.service';

@Injectable()

export class EntityNodeService {
  constructor(private _store: ReduxStoreService) { }
  
  loadTreeNodes(root) {
    console.log(root);
    if (root.children_count > 0) {
      this._store.dispatchAction({
        name: 'LOAD_CHILDREN',
        node: {
          fetch_url: 'children/'+root.id,
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
  }
}
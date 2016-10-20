import { Injectable } from '@angular/core';
import { ReduxStoreService } from '../redux/store.service';

@Injectable()

export class TreeNodeService {
  constructor(private _store: ReduxStoreService) {}

  loadTreeNodes(root) {
    if (root.url) {
      this._store.dispatchAction({ key: root.key, url: root.url, name: 'LOAD_NODES' });
    }
  }
}
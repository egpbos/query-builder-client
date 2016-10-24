import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response } from '@angular/http';
// import { TreeNode } from '../tree-node/tree-node';
// import { treeNodeReducer } from '../tree-node/tree-node-reducer';
import { entityNodeReducer } from '../entity-node/entity-node.reducer';

@Injectable()
export class ReduxStoreService {
  private dataUrl = 'http://localhost:5000/';  // URL to web api

  private dispatcher = new Subject();
  private treeNodes = {};

  private nodes = {};

  constructor(private _http: Http) {
    this.dispatcher.subscribe((action) => this.handleAction(action));
  }

  private handleAction(action) {
    if (action.name === 'LOAD_CHILDREN') {
      if (this.nodes[action.node.url]) {
        this.treeNodes[action.node.url].next(this.nodes[action.node.url]);
      }
      else {
        this._http
          .get(this.dataUrl + action.node.fetch_url)
          .map(
            (res: Response) => res.json()
          )
          .subscribe(res => {
            this.nodes[action.node.url] = entityNodeReducer(res, action);
            this.treeNodes[action.node.url].next(this.nodes[action.node.url]);
          });
      }
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getTreeNodes(url) {
    if (!this.treeNodes.hasOwnProperty(url)) {
      this.treeNodes[url] = new Subject ();
    }
    return this.treeNodes[url].asObservable();
  }

  dispatchAction(action) {
    this.dispatcher.next(action);
  }
}
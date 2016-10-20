import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response } from '@angular/http';
// import { TreeNode } from '../tree-node/tree-node';
// import { treeNodeReducer } from '../tree-node/tree-node-reducer';
import { typesHierarchyReducer } from '../typeshierarchy/typeshierarchy.reducer';

@Injectable()
export class ReduxStoreService {

  private dispatcher = new Subject();
  private treeNodes = {};

  private nodes = {};

  constructor(private _http: Http) {
    this.dispatcher.subscribe((action) => this.handleAction(action));
  }

  private handleAction(action) {
    // if (action.name === 'LOAD_NODES') {
    //   if (this.nodes[action.key]) {
    //     this.treeNodes[action.key].next(this.nodes[action.key]);
    //   }
    //   else {
    //     // this._http.get(action.url)
    //     //        .toPromise()
    //     //        .then(response => response.json().data as Hero[])
    //     //        .catch(this.handleError);

    //     this._http
    //       .get(action.url)
    //       .catch(this.handleError)
    //       .map((res: Response) => res.json())
    //       .subscribe(res => {
    //         this.nodes[action.key] = treeNodeReducer(res, action);
    //         this.treeNodes[action.key].next(this.nodes[action.key]);
    //       });          
    //   }
    // }
    if (action.name === 'LOAD_TYPES') {
      if (this.nodes[action.url]) {
        this.treeNodes[action.url].next(this.nodes[action.url]);
      }
      else {
        // this._http.get(action.url)
        //        .toPromise()
        //        .then(response => response.json().data as Hero[])
        //        .catch(this.handleError);

        this._http
          .get(action.url)
          .map(
            (res: Response) => res.json()
          )
          .subscribe(res => {
            this.nodes[action.url] = typesHierarchyReducer(res, action);
            this.treeNodes[action.url].next(this.nodes[action.url]);
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
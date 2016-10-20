import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TypesHierarchy } from './typeshierarchy';
// import { HEROES } from './mock-heroes';



@Injectable()
export class TypesHierarchyService {
  private dataUrl = 'app/typeshierarchy';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getTypesHierarchies(): Promise<TypesHierarchy[]> {
    return this.http.get(this.dataUrl)
      .toPromise()
      .then(response => response.json().data as TypesHierarchy[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getType(url: string): Promise<TypesHierarchy> {
    return this.getTypesHierarchies()
      .then(typesHierarchy => typesHierarchy.find(typesHierarchy => typesHierarchy.url === url));
  }

  // create(name: string): Promise<TypesHierarchy> {
  //   return this.http
  //     .post(this.dataUrl, JSON.stringify({name: name}), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json().data)
  //     .catch(this.handleError);
  // }

  // update(typesHierarchy: TypesHierarchy): Promise<TypesHierarchy> {
  //   const url = `${this.dataUrl}/${typesHierarchy.url}`;
  //   return this.http
  //     .put(url, JSON.stringify(typesHierarchy), {headers: this.headers})
  //     .toPromise()
  //     .then(() => typesHierarchy)
  //     .catch(this.handleError);
  // }

  // delete(typesHierarchy: TypesHierarchy): void {
  // }  

  // getHeroes(): Promise<Hero[]> {
  //   return Promise.resolve(HEROES);
  // }
}

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// import { Hero } from '../hero/hero';
// import { HeroService } from '../hero/hero.service';

// @Component({
//   moduleId: module.id,
//   selector: 'my-dashboard',
//   templateUrl : 'dashboard.component.html',
//   styleUrls: [ 'dashboard.component.css' ]
// })

// export class DashboardComponent { 
//   heroes: Hero[] = [];

//   constructor(
//     private heroService: HeroService,
//     private router: Router) { }

//   ngOnInit():void {
//     this.heroService.getHeroes()
//       .then(heroes => this.heroes = heroes.slice(1,5));
//   }

//   gotoDetail(hero: Hero): void {
//     let link = ['/detail', hero.id];
//     this.router.navigate(link);
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TypesHierarchy } from '../typeshierarchy/typeshierarchy';
import { TypesHierarchyService } from '../typeshierarchy/typeshierarchy.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl : 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})

export class DashboardComponent { 
  typeshierarchies: TypesHierarchy[] = [];

  constructor(
    private typesHierarchyService: TypesHierarchyService,
    private router: Router) { }

  ngOnInit():void {
    this.typesHierarchyService.getTypesHierarchies()
      .then(typeshierarchies => this.typeshierarchies = typeshierarchies);
  }

  // gotoDetail(hero: TypesHierarchy): void {
  //   let link = ['/detail', hero.id];
  //   this.router.navigate(link);
  // }
}
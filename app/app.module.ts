import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule } from '@angular/router';

import './utils/rxjs-extensions';


// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './utils/in-memory-data.service';
// import { InMemoryDataTypesService }  from './data/in-memory-data-types.service';


import { AppComponent } from './app.component';

// import { HeroService } from './hero/hero.service';
import { EntityNodeService } from './entity-node/entity-node.service';

// import { HeroesComponent } from './heroes/heroes.component';
// import { HeroDetailComponent } from './detail/hero-detail.component';
// import { HeroSearchComponent } from './hero-search/hero-search.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { TypeComponent } from './type/type.component';

import { ReduxStoreService } from './redux/store.service';
// import { TreeNodeService } from './tree-node/tree-node.service';
// import { CountryDemoComponent } from './country-demo/country-demo.component';
import { QuerybuilderComponent } from './querybuilder/querybuilder.component';
import { TreeViewComponent } from './treeview/treeview.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    // InMemoryWebApiModule.forRoot(InMemoryDataTypesService),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: QuerybuilderComponent
      },
      // {
      //   path: 'detail/:id',
      //   component: HeroDetailComponent
      // },
      // {
      //   path: 'heroes',
      //   component: HeroesComponent
      // }
    ])
  ],
  declarations: [
    AppComponent,
    // DashboardComponent,
    // HeroDetailComponent,
    // HeroesComponent,
    // HeroSearchComponent
    QuerybuilderComponent,
    TreeViewComponent,
    // TypeComponent
  ],
  providers: [
    // HeroService,
    EntityNodeService,
    // TreeNodeService,
    ReduxStoreService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {

}
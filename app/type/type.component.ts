import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { TypesHierarchy } from '../typeshierarchy/typeshierarchy';
import { TypesHierarchyService } from '../typeshierarchy/typeshierarchy.service';

@Component({
  moduleId: module.id,
  selector: 'type',
  templateUrl : 'type.component.html',
  styleUrls: [ 'type.component.css' ]
})

export class TypeComponent implements OnInit {
  type: TypesHierarchy; 

  constructor(
    private typesHierarchyService: TypesHierarchyService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let url = params['url'];
      this.typesHierarchyService.getType(url)
        .then(type => this.type = type);
    });
  }
}
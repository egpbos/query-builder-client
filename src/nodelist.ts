import { TNode } from '../src/types';

export const nodelist: TNode[] = [{
    bullet: '#',
    dbrecord: {
        child_of: 12,
        id: 6959,
        is_entity: false,
        is_expandable: false,
        is_instance: true,
        level: 3,
        mention_count: 1,
        name: 'Cross Lander USA Inc',
        url: 'Cross Lander USA Inc'
    },
    id: 1,
    indent: {paddingLeft: '0px'},
    isexpanded: false,
    key: 1,
    name: 'thename',
    nodeclass: 'entity',
    onclick: () => {console.log('blah entity'); }
    }, {
    bullet: '@',
    dbrecord: {
        child_of: 7209,
        id: 7210,
        is_entity: true,
        is_expandable: false,
        is_instance: false,
        level: 4,
        mention_count: 84,
        name: 'BroadcastNetwork',
        url: 'http://dbpedia.org/ontology/BroadcastNetwork'
    },
    id: 2,
    indent: {paddingLeft: '0px'},
    isexpanded: false,
    key: 2,
    name: 'thename2',
    nodeclass: 'instance',
    onclick: () => {console.log('blah instance'); }
    }, {
    bullet: '%',
    dbrecord: {
        child_of: 7509,
        id: 7521,
        is_entity: false,
        is_expandable: false,
        is_instance: true,
        level: 5,
        mention_count: 20,
        name: 'AIK Banka',
        url: 'AIK Banka'
    },
    id: 3,
    indent: {paddingLeft: '30px'},
    isexpanded: false,
    key: 3,
    name: 'thename2',
    nodeclass: 'instance',
    onclick: () => {console.log('blah instance'); }
}];

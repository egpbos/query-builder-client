import { TypesHierarchy } from './typeshierarchy';

export const typesHierarchyReducer = (state: any = [], action) => {
  if (action.name == 'LOAD_TYPES') {    
    return state.data.map(n => {
      return new TypesHierarchy(
        n.children,
        n.instance_count,
        n.instances,
        n.mention_count,
        n.name,
        n.type,
        n.url);
    });
  }
};
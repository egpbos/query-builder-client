import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import Entity          from './components/entity';
import EntityRender    from './components/entity-render';





let ent: Entity = new Entity();

ReactDOM.render(<EntityRender entity={ent}/>, document.getElementById('container'));

import * as React from 'react';
import Entity from './entity';


type props = {
    entity: Entity
};
type state = {
};

export default class EntityRender extends React.Component<props, state> {

    public entity: Entity;

    constructor () {
        super();
    }


    public render() {
        let tsx = (
            <p>
                {this.props.entity.isexpandable ? '+' : '.'}
            </p>
        );
        return tsx;
    }

}



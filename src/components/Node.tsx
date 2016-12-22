import * as React  from 'react';

import './node.css';

export class Node extends React.Component<any, any> {
    constructor() {
        super();
    }

    render(): JSX.Element {

        const indexToJSXElement = (id: number) => {
            return (
                <Node {...this.props.state[id]} key={this.props.state[id].dbid} />
            );
        };
        if (this.props.nodes[1] !== undefined) {
            return (
                <div>
                    <div>{this.props.name}</div>
                    <div>{this.props.children.map(indexToJSXElement)}</div>
                </div>
            );
        } else {
            return <p>pending...</p>;
        }

    }
}

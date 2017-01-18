import * as React   from 'react';

export class Folder extends React.Component<any, any> {
    constructor() {
        super();
        this.onClickFolder = this.onClickFolder.bind(this);
    }

    onClickFolder() {
        this.props.onClickFolder(this.props.dbid);
    }

    render(): JSX.Element {

        const myProps = this.props.entities[this.props.dbid];

        const {name} = myProps;

        return (
            <div onClick={this.onClickFolder}>
                {name}
            </div>
        );
    }
}

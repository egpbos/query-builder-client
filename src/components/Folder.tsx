import * as React   from 'react';

import { File }     from '../components';

export class Folder extends React.Component<any, any> {
    constructor() {
        super();
        this.onClickFolder = this.onClickFolder.bind(this);
    }

    onClickFolder() {
        this.props.methods.onClickFolder(this.props.dbid);
    }

    render(): JSX.Element {

        const myProps = this.props.entities[this.props.dbid];

        const {isinstance, children, name, dbid} = myProps;

        if (isinstance) {
            return (
                <File dbid={dbid} entities={this.props.entities} methods={this.props.methods} />
            );
        } else {
            let childFolders: JSX.Element[] = [];
            if (children !== undefined) {
                childFolders = children.map((childId: number) => {
                    return <Folder key={childId} dbid={childId} entities={this.props.entities} methods={this.props.methods} />;
                });
            }
            return (
                <div>
                    <div onClick={this.onClickFolder}>
                        {name}
                    </div>
                    <div>
                        {childFolders}
                    </div>
                </div>
            );
        }
    }
}

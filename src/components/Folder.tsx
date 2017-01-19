import * as React   from 'react';

import { FolderContents }         from '../components';

export class Folder extends React.Component<any, any> {
    constructor() {
        super();
        this.onClickFolder = this.onClickFolder.bind(this);
    }

    onClickFolder() {
        this.props.onClickFolder(this.props.dbid);
    }

    render(): JSX.Element {

        const { name } = this.props.entities[this.props.dbid];
        const { dbid, entities, onClickFolder } = this.props;

        return (
            <div onClick={this.onClickFolder}>
                {name}
                <FolderContents dbid={dbid} entities={entities} onClickFolder={onClickFolder}/>
            </div>
        );
    }
}

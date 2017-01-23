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
        const { dbid, entities, onClickFolder, onClickFile } = this.props;

        return (
            <div>
                <span onClick={this.onClickFolder}>{name}</span>
                <FolderContents
                    dbid={dbid}
                    entities={entities}
                    onClickFolder={onClickFolder}
                    onClickFile={onClickFile}
                />
            </div>
        );
    }
}

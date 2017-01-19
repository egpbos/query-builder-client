import * as React   from 'react';

import { Folder }   from '../components';
import { File }     from '../components';

export class FolderContents extends React.Component<any, any> {
    constructor() {
        super();
    }

    render(): JSX.Element {

        const { entities, dbid, onClickFolder, onClickFile } = this.props;

        let childFolders: JSX.Element[];
        let childFiles: JSX.Element[];

        if (entities[dbid].hasOwnProperty('children') && entities[dbid].children !== undefined) {
            childFolders = entities[dbid].children.map((childId: number) => {
                if (entities.hasOwnProperty(childId) && entities[childId].isinstance !== true) {
                    return (<Folder key={childId} dbid={childId} entities={entities} onClickFolder={onClickFolder}/>);
                } else {
                    return;
                }
            });
            childFiles = entities[dbid].children.map((childId: number) => {
                if (entities.hasOwnProperty(childId) && entities[childId].isinstance === true) {
                    return (<File key={childId} dbid={childId} entities={entities} onClickFile={onClickFile}/>);
                } else {
                    return;
                }
            });
        } else {
            return (<div />);
        }

        return (
            <div>
                {childFolders}
                {childFiles}
            </div>
        );
    }
}

import * as React   from 'react';

import { Folder }   from '../components';
import { File }     from '../components';

export class FolderContents extends React.Component<any, any> {
    constructor() {
        super();
    }

    render(): JSX.Element {

        const { entities, dbid, onClickFolder, onClickFile } = this.props;

        const hasChildren = entities[dbid].hasOwnProperty('children') && entities[dbid].children !== undefined;

        let children: JSX.Element[] = [];

        if (hasChildren) {
            children = entities[dbid].children.map((childId: number) => {
                if (entities.hasOwnProperty(childId)) {
                    if (entities[childId].isfile !== true) {
                        return (<Folder
                            key={childId}
                            dbid={childId}
                            entities={entities}
                            onClickFolder={onClickFolder}
                            onClickFile={onClickFile}
                        />);
                    } else {
                        return (<File
                            key={childId}
                            dbid={childId}
                            entities={entities}
                            onClickFile={onClickFile}
                        />);
                    }
                } else {
                    return;
                }
            });
        }

        return (
            <div>
                {children}
            </div>
        );
    }
}

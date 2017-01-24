import * as React   from 'react';

import { Folder }   from '../components';
import { File }     from '../components';

export class FolderContents extends React.Component<any, any> {
    constructor() {
        super();
    }

    render(): JSX.Element {

        const { entities, dbid, onClickFolder, onClickFile, onClickCheckbox } = this.props;
        const exists = entities.hasOwnProperty(dbid);
        const hasChildren = exists && entities[dbid].hasOwnProperty('children') && entities[dbid].children !== undefined;

        let children: JSX.Element[] = [];

        if (exists && hasChildren) {
            children = entities[dbid].children.map((childId: number) => {
                if (entities.hasOwnProperty(childId)) {
                    if (entities[childId].isfile !== true) {
                        return (<Folder
                            key={childId}
                            dbid={childId}
                            entities={entities}
                            onClickFolder={onClickFolder}
                            onClickFile={onClickFile}
                            onClickCheckbox={onClickCheckbox}
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

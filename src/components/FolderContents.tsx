import * as React            from 'react';

import { Folder }            from '../components';
import { File }              from '../components';
import { entityHasChildren } from '../utils';

export class FolderContents extends React.Component<any, any> {
    constructor() {
        super();
    }

    render(): JSX.Element {

        const { nodes, dbid, onClickFolder, onClickFile, onClickCheckbox } = this.props;
        const hasChildren = entityHasChildren(nodes, dbid);

        let children: JSX.Element[] = [];

        if (hasChildren) {
            children = nodes[dbid].children.map((childId: number) => {
                if (nodes.hasOwnProperty(childId)) {
                    if (nodes[childId].isfile !== true) {
                        return (<Folder
                            key={childId}
                            dbid={childId}
                            nodes={nodes}
                            onClickFolder={onClickFolder}
                            onClickFile={onClickFile}
                            onClickCheckbox={onClickCheckbox}
                        />);
                    } else {
                        return (<File
                            key={childId}
                            dbid={childId}
                            nodes={nodes}
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

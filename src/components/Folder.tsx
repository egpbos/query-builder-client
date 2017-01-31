import * as React            from 'react';
import { Cell, Grid }        from 'react-mdl';
import { Checkbox }          from 'react-mdl';

import { FolderContents }    from '../components';
import { Selected }          from '../types';
import { entityHasChildren } from '../utils';

import './Folder.css';

export class Folder extends React.Component<any, any> {

    public expanded: boolean;

    constructor() {
        super();
        this.onClickCheckbox = this.onClickCheckbox.bind(this);
        this.onClickFolder = this.onClickFolder.bind(this);
    }

    onClickFolder() {
        const { dbid, nodes } = this.props;
        const { expanded } = nodes[dbid];
        const hasChildren = entityHasChildren(nodes, dbid);
        this.props.onClickFolder(dbid, expanded, hasChildren);
    }

    onClickCheckbox() {
        this.props.onClickCheckbox(this.props.dbid);
    }

    public renderFolderContents(expanded: boolean): JSX.Element {

        const { dbid, nodes} = this.props;
        const { onClickFolder, onClickFile, onClickCheckbox } = this.props;

        if (expanded) {
            return (
                <FolderContents
                    dbid={dbid}
                    nodes={nodes}
                    onClickFolder={onClickFolder}
                    onClickFile={onClickFile}
                    onClickCheckbox={onClickCheckbox}
                />);
        } else {
            return (<div />);
        }
    }

    render(): JSX.Element {

        const { name, expanded, selected } = this.props.nodes[this.props.dbid];
        const checked = selected === Selected.All;
        return (
            <div>
                <Grid className={'mdl-cell--12-col category'}>
                    <Cell col={12} className="categoryTitleBar">
                        <Checkbox onChange={this.onClickCheckbox} checked={checked}/>
                        <span className="categoryText" onClick={this.onClickFolder} >
                            {name}
                        </span>
                        {this.renderFolderContents(expanded)}
                    </Cell>
                </Grid>
            </div>
        );
    }
}

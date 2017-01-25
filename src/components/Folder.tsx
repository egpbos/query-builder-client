import * as React            from 'react';
import { Cell, Grid }        from 'react-mdl';
import { Checkbox }          from 'react-mdl';

import { FolderContents }    from '../components';
import { entityHasChildren } from '../utils';
import { Selected }          from '../utils';

import './Folder.css';

export class Folder extends React.Component<any, any> {

    public expanded: boolean;

    constructor() {
        super();
        this.onClickCheckbox = this.onClickCheckbox.bind(this);
        this.onClickFolder = this.onClickFolder.bind(this);
    }

    onClickFolder() {
        const { dbid, entities } = this.props;
        const { expanded } = entities[dbid];
        const hasChildren = entityHasChildren(entities, dbid);
        this.props.onClickFolder(dbid, expanded, hasChildren);
    }

    onClickCheckbox() {
        this.props.onClickCheckbox(this.props.dbid);
    }

    public renderFolderContents(expanded: boolean): JSX.Element {

        const { dbid, entities} = this.props;
        const { onClickFolder, onClickFile, onClickCheckbox } = this.props;

        if (expanded) {
            return (
                <FolderContents
                    dbid={dbid}
                    entities={entities}
                    onClickFolder={onClickFolder}
                    onClickFile={onClickFile}
                    onClickCheckbox={onClickCheckbox}
                />);
        } else {
            return (<div />);
        }
    }

    render(): JSX.Element {

        const { name, expanded, selected } = this.props.entities[this.props.dbid];
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

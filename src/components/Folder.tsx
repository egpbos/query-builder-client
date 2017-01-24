import * as React         from 'react';
import { Cell, Grid }     from 'react-mdl';
import { Checkbox }       from 'react-mdl';

import { FolderContents } from '../components';

import './Folder.css';

export class Folder extends React.Component<any, any> {
    constructor() {
        super();
        this.onClickCheckbox = this.onClickCheckbox.bind(this);
        this.onClickFolder = this.onClickFolder.bind(this);
    }

    onClickFolder() {
        this.props.onClickFolder(this.props.dbid);
    }

    onClickCheckbox() {
        this.props.onClickCheckbox(this.props.dbid);
    }

    render(): JSX.Element {

        const { name } = this.props.entities[this.props.dbid];
        const { dbid, entities, onClickFolder, onClickFile, onClickCheckbox } = this.props;
        const highlighted = true;
        let classNameStr: string = 'mdl-cell--12-col category';
        if (highlighted === true) {
            classNameStr += ' highlighted';
        }

        return (
            <div>
                <Grid className={classNameStr}>
                    <Cell col={12} className="categoryTitleBar">
                        <Checkbox onClick={this.onClickCheckbox}/>
                        <span className="categoryText" onClick={this.onClickFolder}>
                            {name}
                        </span>
                        <FolderContents
                            dbid={dbid}
                            entities={entities}
                            onClickFolder={onClickFolder}
                            onClickFile={onClickFile}
                            onClickCheckbox={onClickCheckbox}
                        />
                    </Cell>
                </Grid>
            </div>
        );
    }
}

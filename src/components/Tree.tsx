import * as React   from 'react';
import { connect }  from 'react-redux';
import { Dispatch } from 'react-redux';

import { childrenRequestedThunk } from '../actions';
import { Folder }                 from '../components';
import { IGenericAction }         from '../interfaces';

export class UnconnectedTree extends React.Component<any, any> {
    constructor() {
        super();
    }

    render(): JSX.Element {
        // Folder needs to call itself recursively. Currently Tree can render 1 layer deep onCLick
        const dbidRoot = 1;
        const me = this.props.entities[dbidRoot];
        let childFolders: JSX.Element[] = [];
        if (me.hasOwnProperty('children') && me.children !== undefined) {
            childFolders = me.children.map((childId: number) => {
                return (
                    <Folder dbid={childId} key={childId} entities={this.props.entities} onClickFolder={this.props.onClickFolder}/>
                );
            });
        }
        return (
            <div>
                <Folder dbid={dbidRoot} key={dbidRoot} entities={this.props.entities} onClickFolder={this.props.onClickFolder}/>
                <div>{childFolders}</div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        entities: state
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IGenericAction>) => {
    return {
        onClickFolder: (dbid: number) => {
            dispatch(childrenRequestedThunk(dbid));
        }
    };
};

export const Tree = connect(mapStateToProps, mapDispatchToProps)(UnconnectedTree);

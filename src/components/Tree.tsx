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
        const dbidRoot = 1;
        const { entities, onClickFolder, onClickFile } = this.props;
        return (
            <Folder
                key={dbidRoot}
                dbid={dbidRoot}
                entities={entities}
                onClickFolder={onClickFolder}
                onClickFile={onClickFile}
            />
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
        },
        onClickFile: (dbid: number) => {
            console.log('clicked file with dbid=' + dbid.toString());
        }
    };
};

export const Tree = connect(mapStateToProps, mapDispatchToProps)(UnconnectedTree);

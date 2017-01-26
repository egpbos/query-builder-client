import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { buildQuery }               from '../actions';
import { openBuildQueryDialog }     from '../actions';
import { getDaemonStatusThunk }     from '../actions';

import { QueryBuildDialog }         from './QueryBuildDialog';

import { Button }                   from 'react-mdl';

import { IStore }                   from '../interfaces';

import './queryBuildButton.css';
import './queryDialog.css';

interface IQueryBuildButtonDispatchProps {
    getDaemonStatus: () => void;
    // getDaemonStatus: (url: string, port: number) => void;

    buildQuery: () => void;
    openDialog: () => void;
}

export interface IQueryBuildButton {
    buttonActive: boolean;
}

export class UnconnectedQueryBuildButton extends React.Component<IQueryBuildButton & IQueryBuildButtonDispatchProps, { }> {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    static shouldButtonBeActive(state: IStore): boolean {
        if ((state.queryState.entities  && state.queryState.entities.length > 0) ||
            (state.queryState.events    && state.queryState.events.length > 0) ||
            (state.queryState.sources   && state.queryState.sources.length > 0) ||
            (state.queryState.topics    && state.queryState.topics.length > 0)) {
            return true;
        }
        return false;
    }

    static mapStateToProps(state: IStore) { //state: IStore) {
        return {
            buttonActive: UnconnectedQueryBuildButton.shouldButtonBeActive(state)
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            getDaemonStatus: () => {
                dispatch(getDaemonStatusThunk());
            },
            buildQuery: () => {
                dispatch(buildQuery());
            },
            openDialog: () => {
                dispatch(openBuildQueryDialog());
            }
        };
    }

    public onClick() {
        this.props.getDaemonStatus();
        this.props.buildQuery();
        this.props.openDialog();
    }

    render() {
        return (
            <div>
                <Button raised disabled={ !this.props.buttonActive } colored onClick={ this.onClick }>
                    Build Query
                </Button>
                <QueryBuildDialog />
            </div>
        );
    }
}

// Export just the connected component
export const QueryBuildButton = connect(UnconnectedQueryBuildButton.mapStateToProps,
                                        UnconnectedQueryBuildButton.mapDispatchToProps)(UnconnectedQueryBuildButton);

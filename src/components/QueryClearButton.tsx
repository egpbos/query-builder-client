import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { openClearQueryDialog }     from '../actions';

import { QueryClearDialog }         from './QueryClearDialog';

import { Button }                   from 'react-mdl';

import { IStore }                   from '../interfaces';

import './queryClearButton.css';
import './queryDialog.css';

interface IQueryClearButtonDispatchProps {
    openDialog: () => void;
}

export interface IQueryClearButton {
    buttonActive: boolean;
}

export class UnconnectedQueryClearButton extends React.Component<IQueryClearButton & IQueryClearButtonDispatchProps, {}> {
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
            buttonActive: UnconnectedQueryClearButton.shouldButtonBeActive(state)
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            openDialog: () => {
                dispatch(openClearQueryDialog());
            }
        };
    }

    public onClick() {
        this.props.openDialog();
    }

    render() {
        return (
            <div>
                <Button raised disabled={!this.props.buttonActive} accent onClick={this.onClick}>
                    Clear Query
                </Button>
                <QueryClearDialog />
            </div>
        );
    }
}

// Export just the connected component
export const QueryClearButton = connect(UnconnectedQueryClearButton.mapStateToProps,
                                        UnconnectedQueryClearButton.mapDispatchToProps)(UnconnectedQueryClearButton);

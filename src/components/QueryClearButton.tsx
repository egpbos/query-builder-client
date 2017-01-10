import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { clearQuery }               from '../actions';
import { openClearQueryDialog }     from '../actions';
import { closeClearQueryDialog }    from '../actions';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from 'react-mdl';

import { IStore }                   from '../interfaces';

import './queryClearButton.css';
import './queryDialog.css';

interface IQueryClearButtonDispatchProps {
    clearQuery: () => void;
    openDialog: () => void;
    closeDialog: () => void;
}

export interface IQueryClearButton {
    id: number;
    query: any;
    dialogOpen: boolean;
    buttonActive: boolean;
}

export class UnconnectedQueryClearButton extends React.Component<IQueryClearButton & IQueryClearButtonDispatchProps, {}> {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
        this.clickClearQuery = this.clickClearQuery.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
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
            id:  -1,
            query: state.queryState,
            dialogOpen: state.queryState.isQueryClearDialogOpen,
            buttonActive: UnconnectedQueryClearButton.shouldButtonBeActive(state)
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            clearQuery: () => {
                dispatch(clearQuery());
            },
            openDialog: () => {
                dispatch(openClearQueryDialog());
            },
            closeDialog: () => {
                dispatch(closeClearQueryDialog());
            }
        };
    }

    public onClick() {
        this.props.openDialog();
    }

    public clickClearQuery() {
      this.props.clearQuery();
      this.props.closeDialog();
    }

    public handleOpenDialog() {
        this.props.openDialog();
    }

    public handleCloseDialog() {
        this.props.closeDialog();
    }

    render() {
        return (
            <div>
                <Button raised disabled={!this.props.buttonActive} accent onClick={this.onClick}>
                    Clear Query
                </Button>
                <Dialog key="clearDialog" open={this.props.dialogOpen} onCancel={this.handleCloseDialog}>
                    <DialogTitle component="h4">You are about to clear your query. Are you sure?</DialogTitle>
                    <DialogContent>
                        You will not be able to undo this action.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.clickClearQuery}>Clear Query</Button>
                        <Button onClick={this.handleCloseDialog}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

// Export just the connected component
export const QueryClearButton = connect(UnconnectedQueryClearButton.mapStateToProps,
                                        UnconnectedQueryClearButton.mapDispatchToProps)(UnconnectedQueryClearButton);

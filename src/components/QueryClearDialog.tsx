import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { clearQuery }               from '../actions';
import { closeClearQueryDialog }    from '../actions';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from 'react-mdl';

import { IStore }                   from '../interfaces';

import './queryDialog.css';

interface IQueryClearDialogDispatchProps {
    clearQuery: () => void;
    closeDialog: () => void;
}

export interface IQueryClearDialog {
    query: any;
    dialogOpen: boolean;
}

export class UnconnectedQueryClearDialog extends React.Component<IQueryClearDialog & IQueryClearDialogDispatchProps, {}> {
    constructor() {
        super();

        this.clickClearQuery = this.clickClearQuery.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    static mapStateToProps(state: IStore) { //state: IStore) {
        return {
            query: state.queryState,
            dialogOpen: state.queryState.isQueryClearDialogOpen
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            clearQuery: () => {
                dispatch(clearQuery());
            },
            closeDialog: () => {
                dispatch(closeClearQueryDialog());
            }
        };
    }

    public clickClearQuery() {
      this.props.clearQuery();
      this.props.closeDialog();
    }

    public handleCloseDialog() {
        this.props.closeDialog();
    }

    render() {
        return (
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
        );
    }
}

// Export just the connected component
export const QueryClearDialog = connect(UnconnectedQueryClearDialog.mapStateToProps,
                                        UnconnectedQueryClearDialog.mapDispatchToProps)(UnconnectedQueryClearDialog);

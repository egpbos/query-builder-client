import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { clearQueryWasClicked }     from '../../actions';
import { openClearQueryDialog }     from '../../actions';
import { closeClearQueryDialog }    from '../../actions';
import { GenericAction }            from '../../types';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from 'react-mdl';

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

export class UnconnectedQueryClearButton extends React.Component<IQueryClearButton & IQueryClearButtonDispatchProps, { }> {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
        this.clickClearQuery = this.clickClearQuery.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    static shouldButtonBeActive(state: any): boolean {
        if ((state.query.entities  && state.query.entities.length > 0) ||
            (state.query.events    && state.query.events.length > 0) ||
            (state.query.sources   && state.query.sources.length > 0) ||
            (state.query.topics    && state.query.topics.length > 0)) {
            return true;
        }
        return false;
    }

    static mapStateToProps(state: any) {
        return {
            id:  -1,
            query: state.query,
            dialogOpen: state.query.isQueryClearDialogOpen,
            buttonActive: UnconnectedQueryClearButton.shouldButtonBeActive(state)
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            clearQuery: () => {
                dispatch(clearQueryWasClicked());
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
                <Button raised disabled={ !this.props.buttonActive } accent onClick={ this.onClick }>
                    Clear Query
                </Button>
                <Dialog key="clearDialog" open={ this.props.dialogOpen } onCancel={ this.handleCloseDialog }>
                    <DialogTitle component="h4">You are about to clear your query. Are you sure?</DialogTitle>
                    <DialogContent>
                        You will not be able to undo this action.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ this.clickClearQuery }>Clear Query</Button>
                        <Button onClick={ this.handleCloseDialog }>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

// Export just the connected component
export const QueryClearButton = connect(UnconnectedQueryClearButton.mapStateToProps,
                                        UnconnectedQueryClearButton.mapDispatchToProps)(UnconnectedQueryClearButton);

import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { buildQuery }               from '../actions';
import { storeQuery }               from '../actions';
import { openBuildQueryDialog }     from '../actions';
import { closeBuildQueryDialog }    from '../actions';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from 'react-mdl';

import { IStore }                   from '../interfaces';

import './queryBuildButton.css';
import './queryDialog.css';

interface IQueryBuildButtonDispatchProps {
    buildQuery: () => void;
    storeQuery: () => void;
    openDialog: () => void;
    closeDialog: () => void;
}

export interface IQueryBuildButton {
    id: number;
    query: any;
    dialogOpen: boolean;
    buttonActive: boolean;
}

export class UnconnectedQueryBuildButton extends React.Component<IQueryBuildButton & IQueryBuildButtonDispatchProps, {}> {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
        this.clickStoreQuery = this.clickStoreQuery.bind(this);
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
            dialogOpen: state.queryState.isQueryBuildDialogOpen,
            buttonActive: UnconnectedQueryBuildButton.shouldButtonBeActive(state)
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            buildQuery: () => {
                dispatch(buildQuery());
            },
            storeQuery: () => {
                dispatch(storeQuery());
            },
            openDialog: () => {
                dispatch(openBuildQueryDialog());
            },
            closeDialog: () => {
                dispatch(closeBuildQueryDialog());
            }
        };
    }

    public onClick() {
        this.props.buildQuery();
        this.props.openDialog();
    }

    public clickStoreQuery() {
        this.props.storeQuery();
        this.props.closeDialog();
    }

    public handleOpenDialog() {
        this.props.openDialog();
    }

    public handleCloseDialog() {
        this.props.closeDialog();
    }

    render() {
        let queryEntities: JSX.Element[] = [];
        if (this.props.query !== undefined && this.props.query.entities !== undefined) {
            const temp: any[] = this.props.query.entities;
            queryEntities = temp.map((queryEntity: any) =>
                <div key={queryEntity.name}>{queryEntity.name}</div>
            );
        }
        let queryEvents: JSX.Element[] = [];
        if (this.props.query !== undefined && this.props.query.events !== undefined) {
            const temp: any[] = this.props.query.events;
            queryEvents = temp.map((queryEvent: any) =>
                <div key={queryEvent.name}>{queryEvent.name}</div>
            );
        }
        let querySources: JSX.Element[] = [];
        if (this.props.query !== undefined && this.props.query.sources !== undefined) {
            const temp: any[] = this.props.query.sources;
            querySources = temp.map((querySource: any) =>
                <div key={querySource.name}>{querySource.name}</div>
            );
        }
        let queryTopics: JSX.Element[] = [];
        if (this.props.query !== undefined && this.props.query.topics !== undefined) {
            const temp: any[] = this.props.query.topics;
            queryTopics = temp.map((queryTopic: any) =>
                <div key={queryTopic.name}>{queryTopic.name}</div>
            );
        }
        return (
            <div>
                <Button raised disabled={!this.props.buttonActive} colored onClick={this.onClick}>
                    Build Query
                </Button>
                <Dialog key="buildDialog" open={this.props.dialogOpen} onCancel={this.handleCloseDialog}>
                    <DialogTitle component="h4">Do you want to send the following query to the KnowledgeStore?</DialogTitle>
                    <DialogContent>
                        <div>
                            {(queryEntities.length > 0) ? <b>Entities</b> : <div />}
                            {(queryEntities.length > 0) ? queryEntities : <div />}

                            {(queryEvents.length > 0) ? <b>Events</b> : <div />}
                            {(queryEvents.length > 0) ? queryEvents : <div />}

                            {(querySources.length > 0) ? <b>Sources</b> : <div />}
                            {(querySources.length > 0) ? querySources : <div />}

                            {(queryTopics.length > 0) ? <b>Topics</b> : <div />}
                            {(queryTopics.length > 0) ? queryTopics : <div />}
                        </div>
                        <div>
                            <b>Resulting Query String:</b>
                        </div>
                        <div>
                            {this.props.query.queryString}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.clickStoreQuery}>Perform Query</Button>
                        <Button onClick={this.handleCloseDialog}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

// Export just the connected component
export const QueryBuildButton = connect(UnconnectedQueryBuildButton.mapStateToProps,
                                        UnconnectedQueryBuildButton.mapDispatchToProps)(UnconnectedQueryBuildButton);

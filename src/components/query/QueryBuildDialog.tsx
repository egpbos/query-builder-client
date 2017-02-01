import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { storeQueryThunk }          from '../../actions';
import { closeBuildQueryDialog }    from '../../actions';
import { queryTextChanged }         from '../../actions';
import { GenericAction }            from '../../types';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Textfield } from 'react-mdl';

import '../shared.css';
import './QueryDialogs.css';

interface IQueryBuildDialogDispatchProps {
    storeQuery: (username: string, query: string) => void;
    closeDialog: () => void;
    changeQueryText: (newtext : string) => void;
}

export interface IQueryBuildDialog {
    query: any;
    dialogOpen: boolean;
    daemonStatus: number;
}

export class UnconnectedQueryBuildDialog extends React.Component<IQueryBuildDialog & IQueryBuildDialogDispatchProps, {}> {
    constructor() {
        super();

        this.clickStoreQuery = this.clickStoreQuery.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    static mapStateToProps(state: any) { //state: IStore) {
        return {
            query: state.query,
            dialogOpen: state.query.isQueryBuildDialogOpen,
            daemonStatus: state.query.daemonStatus
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            storeQuery: (username: string, query: string) => {
                dispatch(storeQueryThunk(username, query));
            },
            closeDialog: () => {
                dispatch(closeBuildQueryDialog());
            },
            changeQueryText: (newtext : string) => {
                dispatch(queryTextChanged(newtext));
            }
        };
    }

    public clickStoreQuery() {
        const username = 'defaultuser';
        const query = this.props.query.queryString;
        this.props.storeQuery(username, query);
        this.props.closeDialog();
    }

    public handleCloseDialog() {
        this.props.closeDialog();
    }

    public handleTextChange(event : any) {
        this.props.changeQueryText(event.target.value);
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
        const count = this.props.query.selectedMentionCount;
        let mentionClass = '';
        if (this.props.query.selectedMentionCount < -10000 || this.props.query.selectedMentionCount > 10000) {
            mentionClass = 'impossible_query';
        } else if (this.props.query.selectedMentionCount < -5000 || this.props.query.selectedMentionCount > 5000) {
            mentionClass = 'heavy_query';
        } else {
            mentionClass = 'safe_query';
        }

        return (
            <Dialog key="buildDialog" open={this.props.dialogOpen} onCancel={this.handleCloseDialog}>
                <DialogTitle component="h4">Do you want to send the following query to the KnowledgeStore?</DialogTitle>
                <DialogContent>
                    <div> Daemon status: {this.props.daemonStatus} </div>
                    <div>
                        Number of mentions selected:
                        <span className={mentionClass}>
                          {count < 0 ? ' < ' + -count : ' ' + count}
                        </span>
                    </div>
                    <br />
                    <div>
                        <b>Resulting Query String:</b>
                    </div>
                    <Textfield
                        className="querytextbox dialog-textfield"
                        key="QueryBuildTextfield"
                        onChange={this.handleTextChange}
                        label="Query Text..."
                        rows={3}
                        expandable
                        value={this.props.query.queryString}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.clickStoreQuery}>Perform Query</Button>
                    <Button onClick={this.handleCloseDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

// Export just the connected component
export const QueryBuildDialog = connect(UnconnectedQueryBuildDialog.mapStateToProps,
                                        UnconnectedQueryBuildDialog.mapDispatchToProps)(UnconnectedQueryBuildDialog);
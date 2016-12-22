import * as React                   from 'react';
import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { buildQuery }               from '../actions';

import { Button }                   from 'react-mdl';

import './queryBuildButton.css';

interface IQueryBuildButtonDispatchProps {
    buildQuery: () => void;
}

export interface IQueryBuildButton {
    id: number;
}

export class UnconnectedQueryBuildButton extends React.Component<IQueryBuildButton & IQueryBuildButtonDispatchProps, {}> {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    static mapStateToProps() { //state: IStore) {
        return {
            id:  -1
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            buildQuery: () => {
                dispatch(buildQuery());
            }
        };
    }

    public onClick() {
        this.props.buildQuery();
    }

    render() {
        return (
            <Button raised onClick={this.onClick}>
                Build Query
            </Button>
        );
    }
}

// Export just the connected component
export const QueryBuildButton = connect(UnconnectedQueryBuildButton.mapStateToProps,
                                        UnconnectedQueryBuildButton.mapDispatchToProps)(UnconnectedQueryBuildButton);

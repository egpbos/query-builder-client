import * as React  from 'react';
// import { connect } from 'react-redux';

import { NodeList } from './NodeList';

type AppProps = {
    store: any;
};

type AppState = {
};

export class App extends React.Component<AppProps, AppState> {

    constructor() {
        super();
    }

    public render() {

        return (
            <NodeList nodes={this.props.store.getState()} dispatch={this.props.store.dispatch} />
        );
    }
}

import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { textSearchThunk }               from '../actions';

import { Textfield }                from 'react-mdl';

import './searchbox.css';

interface ISearchboxDispatchProps {
    textSearch: (input: string) => void;
}

export interface ISearchbox {
    id: number;
}

export class UnconnectedSearchbox extends React.Component<ISearchbox & ISearchboxDispatchProps, {}> {
    constructor() {
        super();
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    static mapStateToProps() { //state: IStore) {
        return {
            id:  -1
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            textSearch: (input: string) => {
                dispatch(textSearchThunk('entities', input));
                dispatch(textSearchThunk('events', input));
                dispatch(textSearchThunk('sources', input));
                dispatch(textSearchThunk('topics', input));
            }
        };
    }

    public handleTextChange(event : any) {
        this.props.textSearch(event.target.value);
    }

    render() {
        return (
            <Textfield
                className="searchbox"
                key="SearchboxTextfield"
                onChange={this.handleTextChange}
                label="Search for..."
                style={{width: '200px'}}
            />
        );
    }
}

// Export just the connected component
export const Searchbox = connect(UnconnectedSearchbox.mapStateToProps,
                                 UnconnectedSearchbox.mapDispatchToProps)(UnconnectedSearchbox);

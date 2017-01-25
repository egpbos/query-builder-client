import * as React                   from 'react';

import { connect }                  from 'react-redux';

import { IStore }                   from '../interfaces';

import './mentionCounter.css';

export interface IMentionCounter {
    id: number;
    selectedMentionCount: number;
}

export class UnconnectedMentionCounter extends React.Component<IMentionCounter, { }> {
    constructor() {
        super();
    }

    static mapStateToProps(state: IStore) { //state: IStore) {
        return {
            id:  -1,
            selectedMentionCount: state.queryState.selectedMentionCount
        };
    }

    static mapDispatchToProps() {
        return {
        };
    }

    render() {
        return (
            <div className="mdl-textfield mdl-js-textfield mentioncounter">
                Selected Mentions: { this.props.selectedMentionCount ? this.props.selectedMentionCount : 0 }
            </div>
        );
    }
}

// Export just the connected component
export const MentionCounter = connect(UnconnectedMentionCounter.mapStateToProps,
                                      UnconnectedMentionCounter.mapDispatchToProps)(UnconnectedMentionCounter);

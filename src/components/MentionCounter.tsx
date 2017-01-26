import * as React                   from 'react';

import { connect }                  from 'react-redux';

import { IStore }                   from '../interfaces';

import './mentionCounter.css';

export interface IMentionCounter {
    selectedMentionCount: number;
}

export class UnconnectedMentionCounter extends React.Component<IMentionCounter, {}> {
    constructor() {
        super();
    }

    static mapStateToProps(state: IStore) { //state: IStore) {
        return {
            selectedMentionCount: state.queryState.selectedMentionCount
        };
    }

    static mapDispatchToProps() {
        return {};
    }

    render() {
        let mentionClass = '';
        if (this.props.selectedMentionCount < -10000 || this.props.selectedMentionCount > 10000) {
            mentionClass = 'impossible_query';
        } else if (this.props.selectedMentionCount < -5000 || this.props.selectedMentionCount > 5000) {
            mentionClass = 'heavy_query';
        } else {
            mentionClass = 'safe_query';
        }
        return (
            <div className="mdl-textfield mdl-js-textfield mentioncounter">
                Selected Mentions:
                <span className={mentionClass}>
                {this.props.selectedMentionCount < 0 ? ' < ' + -this.props.selectedMentionCount : ' ' + this.props.selectedMentionCount}
                </span>
            </div>
        );
    }
}

// Export just the connected component
export const MentionCounter = connect(UnconnectedMentionCounter.mapStateToProps,
                                      UnconnectedMentionCounter.mapDispatchToProps)(UnconnectedMentionCounter);

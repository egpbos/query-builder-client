import * as React             from 'react';
import { connect }                      from 'react-redux';
import { Dispatch }                     from 'redux';

import { IGenericAction}                from '../actions';
import { expandButtonWasClicked }       from '../actions';
// import { checkboxWasClicked }           from '../actions';
import { selectionWasClicked }          from '../actions';
import { childrenRequestedThunk }       from '../actions';

// import { Grid, Cell, Button } from 'react-mdl';
import { Grid } from 'react-mdl';
import { SelectionState }     from '../interfaces';
// import Checkbox               from '../Checkbox/Checkbox';
import { IStore }                       from '../interfaces';

import './node.css';

interface IExtraProps {
    nodeID: number;
}

export interface INewNode {
    parent:         number;
    id:             number;
    isentity:       boolean;
    isleaf:         boolean;
    isinstance:     boolean;
    level:          number;
    mentioncount:   number;
    name:           string;
    url:            string;
    isexpanded:     boolean;
    selectionState: SelectionState;
    children:       number[];
}

interface INewNodeDispatchProps {
    onClickExpand: (id: number) => void;
    fetchChildren: (parent: number) => void;
    toggleSelection: (node: number) => void;
}

export class UnconnectedNewNode extends React.Component<IExtraProps & INewNode & INewNodeDispatchProps, {}> {
    constructor() {
        super();
    }

    static mapStateToProps(state: IStore, ownProps : IExtraProps & INewNode) {
        const dbid = ownProps.nodeID;

        return {
            nodeID:         dbid,

            parent:         state.nodes[dbid].childof,
            id:             state.nodes[dbid].id,
            isentity:       state.nodes[dbid].isentity,
            isleaf:         state.nodes[dbid].isleaf,
            isinstance:     state.nodes[dbid].isinstance,
            level:          state.nodes[dbid].level,
            mentioncount:   state.nodes[dbid].mentioncount,
            name:           state.nodes[dbid].name,
            url:            state.nodes[dbid].url,
            isexpanded:     state.nodes[dbid].isexpanded,
            selectionState: state.nodes[dbid].selectionState,

            children:       []
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            onClickExpand: (id: number) => {
                dispatch(expandButtonWasClicked(id));
            },
            fetchChildren: (id: number) => {
                dispatch(childrenRequestedThunk(id));
            },
            toggleSelection: (node: number) => {
                dispatch(selectionWasClicked(node));
            }
        };
    }

    render() {
      // const nodes: JSX.Element[] = this.props.children.map((node: INewNode) => {
      //       if (this.props.parentID === node.childof) {
      //           return (
      //               <Node
      //                   {...node}
      //                   onClickExpand={this.props.onClickExpand}
      //                   fetchChildren={this.props.fetchChildren}
      //                   massSelection={this.props.massSelection}
      //                   toggleSelection={this.props.toggleSelection}
      //                   key={node.id}
      //               />
      //           );
      //       } else {
      //           return (
      //               <div />
      //           );
      //       }
      //   });

        return (
          <Grid className={'mdl-cell--12-col'}>
            {this.props.name}
            {/* {this.props.children.map(child => <NewNode key={child} comment={child} />)} */}
          </Grid>
        );
    }
}

// Export just the connected component
export const NewNode = connect(UnconnectedNewNode.mapStateToProps,
                               UnconnectedNewNode.mapDispatchToProps)(UnconnectedNewNode);


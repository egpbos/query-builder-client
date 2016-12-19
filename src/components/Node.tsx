import * as React          from 'react';
import { Grid, Cell, Button }   from 'react-mdl';
import { Nodes } from './Nodes'; 

import { INode, SelectionState }                from '../interfaces';
import Checkbox                 from '../Checkbox/Checkbox';
import { UnconnectedNodes } from './Nodes';

import './node.css';

interface INodeDispatchProps {
    onClickExpand: (id: number) => void;
    fetchChildren: (parent: INode|null) => void;
    massSelection: (node: INode) => void;
    toggleSelection: (node: INode) => void;
}

export class Node extends React.Component<INode & INodeDispatchProps, {}> {

    constructor() {
        super();

        this.expand = this.expand.bind(this);
        this.fetchChildren = this.fetchChildren.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClickSelect = this.onClickSelect.bind(this);
        this.onCheckboxClick = this.onCheckboxClick.bind(this);
    }

    public expand() {
        this.props.onClickExpand(this.props.id);
    }

    public fetchChildren() {
        this.props.fetchChildren(this.props);
    }

    public massSelection() {
        this.props.massSelection(this.props);
    }

    public toggleSelection() {
        this.props.toggleSelection(this.props);
    }

    public onClick() {//event: any) {
        // console.log('onClick: ');
        // console.log(event);
        // event.preventDefault();
        // event.stopPropagation();

        const {isleaf, isexpanded} = this.props;
        if (isleaf !== true && isexpanded === false) {
            this.expand();
            this.fetchChildren();
        } else if (isleaf !== true && isexpanded === true) {
            console.error('this.collapse();');
        } else {
            // do nothing
        }
    }

    public onClickSelect() {//event: any) {
        // console.log('onClickselect: ');
        // console.log(event);
        // event.preventDefault();
        // event.stopPropagation();

        this.toggleSelection();
    }

    public onCheckboxClick() {//event: any) {
        // console.log('onCheckboxClick: ');
        // console.log(event);
        // event.preventDefault();
        // event.stopPropagation();        
        this.massSelection();
        // this.toggleSelection();
    }

    public render() {
        const {id, isentity, isinstance, isleaf, isexpanded, selectionState, name} = this.props;

        if (isinstance) {
            return (
                <Cell col={2}>
                    <Button raised accent={selectionState === SelectionState.Selected} onClick={this.onClickSelect}>
                        {name}
                    </Button>
                </Cell>
            );
        } else {
            return (
                <Cell col={12} className="category">
                    <span className="categoryText" onClick={this.onClick}>
                        {name}
                    </span>
                    <span>
                        <Checkbox
                            id={'checkbox-all_' + id}
                            ripple={true}
                            indeterminate={selectionState === SelectionState.Partial}
                            checked={selectionState === SelectionState.Selected}
                            onClick={this.onCheckboxClick}
                        />
                    </span>
                    <Nodes parentID={id} />
                </Cell>
            );
            // <Nodes parentID={id} />

                    // <UnconnectedNodes
                    //     nodes={myChildren}
                    //     onClickExpand={this.props.onClickExpand}
                    //     fetchChildren={this.props.fetchChildren}
                    //     massSelection={this.props.massSelection}
                    //     toggleSelection={this.props.toggleSelection}
                    // />
        }
    }
}

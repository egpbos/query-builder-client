import * as React         from 'react';
import { Dispatch }       from 'redux';

import { Action }         from '../Action';
import { NodeLogic }      from './NodeLogic';

import classNames from 'classnames';
import './node.css';

type props = {
    node: NodeLogic,
    dispatch: Dispatch<Action>
};
type state = {
};

export class NodeRender extends React.Component<props, state> {
    constructor () {
        super();
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onCheckboxClickHandler = this.onCheckboxClickHandler.bind(this);
    }

    public onClickHandler() {
        const node = this.props.node;

        if (node.dbrecord.is_expandable) {
            const toggleExpandAction = {
                type: 'TOGGLE_ISEXPANDED',
                payload: node.dbrecord.id
            };
            this.props.dispatch(toggleExpandAction);
        } else {
            const toggleSelectedAction = {
                type: 'TOGGLE_ISSELECTED',
                payload: node.dbrecord.id
            };
            this.props.dispatch(toggleSelectedAction);
        }        

        if (node.dbrecord.is_expandable && node.isexpanded === false) {
            const fetchChildNodesAction = {
                type: 'FETCH_CHILD_NODES',
                payload: {
                    node,
                    dispatch: this.props.dispatch
                }
            };
            this.props.dispatch(fetchChildNodesAction);
        }
    }

    public onCheckboxClickHandler(event:any) {
        const node = this.props.node;
        event.stopPropagation();

        const toggleMassSelectedAction = {
            type: 'TOGGLE_MASSSELECTED',
            payload: node.dbrecord.id
        };
        this.props.dispatch(toggleMassSelectedAction);
    }

    public render() {
        const node = this.props.node;
        const level = node.dbrecord.level;
        // const nodeclass = node.getClass();

        // let bullet: string;
        // if (node.dbrecord.is_expandable && !node.isexpanded) {
        //     bullet = '+';
        // } else {
        //     bullet = '\u2022';
        // }

        if (node.dbrecord.is_expandable) {
            const indentClasses = classNames({
                'mdl-cell': (level != 0),             
                'mdl-cell--1-col': (level == 1),            
                'mdl-cell--2-col': (level == 2),
                'mdl-cell--3-col': (level == 3),
                'mdl-cell--4-col': (level == 4),
                'mdl-cell--5-col': (level == 5),
                'mdl-cell--6-col': (level == 6),            
            });

            const contentClasses = classNames({
                'mdl-cell': true,
                'mdl-cell--12-col': (level == 0),  
                'mdl-cell--11-col': (level == 1),            
                'mdl-cell--10-col': (level == 2),
                'mdl-cell--9-col': (level == 3),
                'mdl-cell--8-col': (level == 4),
                'mdl-cell--7-col': (level == 5),
                'mdl-cell--6-col': (level == 6),
                'mdl-grid': true
            });

            // const nodeClasses = classNames({
            //     'mdl-cell': true,
            //     'mdl-cell--12-col': true,
            //     'mdl-button--colored': true,
            //     'mdl-button': true,
            //     'mdl-js-button': true,
            //     'mdl-button--raised': true
            // });

// onClick={this.onCheckboxClickHandler}>
            return (
                <div className='mdl-grid mdl-cell mdl-cell--12-col'>
                    <div className={indentClasses}></div>
                    <div className={contentClasses}>
                        <span className='category mdl-cell mdl-cell--12-col' onClick={this.onClickHandler}>   
                            <span className='categoryText'>                     
                                {node.dbrecord.name}
                            </span>
                            <span className='allSelector'>
                                <label className='mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect' 
                                    htmlFor={'checkbox-all_'+node.dbrecord.id} 
                                    checked={node.isselected} onClick={this.onCheckboxClickHandler}>

                                    <input type='checkbox' id={'checkbox-all_'+node.dbrecord.id} className='mdl-checkbox__input'></input>
                                    <span className='mdl-checkbox__label'>Select All</span>
                                </label>
                            </span>    
                        </span>
                    </div>
                </div>
            );
        } else {
            const nodeClasses = classNames({
                'mdl-cell': true,
                'mdl-cell--2-col': true,
                'mdl-button': true,
                'mdl-js-button': true,
                'mdl-button--raised': true,
                'mdl-button--accent': node.isselected
            });

            return (
                <div className={nodeClasses} onClick={this.onClickHandler}>
                    {node.dbrecord.name}                
                </div>
            );
        }
    }
}

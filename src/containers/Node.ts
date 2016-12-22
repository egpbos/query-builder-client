import { connect } from 'react-redux';

import { Node as NodeComponent } from '../components/Node';

const mapStateToProps = (state: any) => {
    return {
        nodes: state.nodes
    };
};

export const Node = connect(mapStateToProps)(NodeComponent);

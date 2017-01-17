import * as React from 'react';

export class Checkbox extends React.Component<any, any> {
    constructor() {
        super();
        this.onClickCheckBox = this.onClickCheckBox.bind(this);
    }

    onClickCheckBox() {
        this.props.methods.onClickCheckBox(this.props.dbid);
    }

    render(): JSX.Element {
        return (
            <div onClick={this.onClickCheckBox}>x</div>
        );
    }
}

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import {Input,Button} from 'antd'
export default class AddTodo extends Component {
    constructor() {
        super();
        this.state = {
            InputValue :'',
        }

    }
    render() {
        return (
            <div>
                {/*<input type='text' ref='input' />*/}
                <Input type='text' onChange={e=>this.handleChange(e)} />
                <Button type='primary' onClick={ e => this.handleClick(e) }>
                    Add
                </Button>
            </div>
        );
    }
    handleChange(e){
        this.setState({
            InputValue: e.target.value,
        });
    }
    handleClick(e) {
        // console.log(this.state.InputValue);
        // const inputNode = findDOMNode(this.refs.input);
        // const text = inputNode.value.trim();
        // this.props.onAddClick(text);
        // inputNode.value = '';

        const text = this.state.InputValue;
        this.props.onAddClick(text);
        this.setState({
            InputValue: '',
        });
    }
}
AddTodo.propTypes = {
    onAddClick: PropTypes.func.isRequired
};
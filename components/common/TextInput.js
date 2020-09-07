/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import blacklist from 'blacklist';

import { Input } from 'antd';

class TextInput extends Component {
    constructor() {
        super();

        this.ref = null;
        this.state = {
            value: ''
        };
    }

    componentDidMount() {
        const { value, autoFocus } = this.props;
        
        if (value) {
            this.setState({value});
        }

        if (autoFocus && this.ref) this.ref.focus();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { value } = nextProps
        
        if (this.state.value !== value) {
            this.setState({value});
        }
    }

    handleChange(event) {
        const { onChange, maxLength } = this.props;
        const value = event.target.value;
        
        if (value && maxLength && maxLength > 0 && value.length > maxLength) return;

        this.setState({value : value || ''});

        if (onChange && typeof onChange === 'function') {
            onChange(event);
        }
    }

    render() {
        const { type, error } = this.props;
        const { value } = this.state;
        
        let InputComponent = Input;
        let t = type || 'text';

        if (t === 'password') {
            InputComponent = Input.Password;
        } else if (t === 'textarea') {
            InputComponent = Input.TextArea;
        }

        return (
            <InputComponent 
                className={cn('form-input', { error })} 
                {...blacklist(this.props, 'error')}
                value={value}
                ref={(ref) => this.ref = ref}
            />
        );
    }
}

TextInput.propTypes = {
    tip: PropTypes.node,
    error: PropTypes.bool,
    type: PropTypes.string,
    input: PropTypes.object
};

export default TextInput;

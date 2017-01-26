'use strict';
import React from 'react';
import Store from '../Store'
import styles from '../../css/components/message-form.scss';

export default class MessageForm extends React.Component {
    /**
     * React: propTypes
     */
    static propTypes = {
        message: React.PropTypes.string,
        submitMessage: React.PropTypes.func,
        originalMessageId: React.PropTypes.number
    };

    /**
     * React: defaultProps
     */
    static defaultProps = {
        message: ''
    };

    /**
     * React: state
     */
    state = {
        message: this.props.message
    };

    render () {
        var placeholderText = 'Tell us what you think';
        var formContainerClass = "";
        var submitMessage = 'Submit';
        if(this.props.originalMessageId){
            placeholderText = 'Your reply to this message';
            submitMessage = "Reply";
        }else {
            formContainerClass = "c-message-form__main-input";
        }
        return (
            <div className={"c-message-form clearfix " + formContainerClass}>
                <form className="clearfix">
                    <label>Message:</label>
                    <textarea cols="50" rows="5" name='message' placeholder={placeholderText}
                              className="ui-input"
                              value={this.state.message}
                              onChange={this._onChangeHandler} />
                    <input type="button" className="ui-button ui-button__red" value={submitMessage} onClick={this._onSubmitHandler} />
                </form>
            </div>
        );
    }

    _onSubmitHandler = (event) => {
        event.preventDefault();

        if(this.state.message===""){
            alert('nothing to submit');
        }else {
            if (typeof this.props.submitMessage === 'function') {
                this.props.submitMessage(this.state.message, Store.getState().UserReducer.user.token, this.props.originalMessageId);
                this.state.message = "";
            }
        }


    };

    _onChangeHandler = (event) => {
        this.setState({message: event.target.value});
    };
}
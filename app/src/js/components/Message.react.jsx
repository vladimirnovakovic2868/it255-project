'use strict';
import React from 'react';
import Store from '../Store';
import Styles from '../../css/components/message.scss';

export default class Message extends React.Component {
    /**
     * React: propTypes
     */
    static propTypes = {
        message: React.PropTypes.shape({
            id: React.PropTypes.number,
            user: React.PropTypes.shape({
                id: React.PropTypes.number,
                username: React.PropTypes.string,
                email: React.PropTypes.string
            }),
            datetime: React.PropTypes.string,
            text: React.PropTypes.string,
            likes: React.PropTypes.number,
            dislikes: React.PropTypes.number
        }),
        disableLike: React.PropTypes.bool,
        likeMessage: React.PropTypes.func,
        showMessageReplies: React.PropTypes.func,
    };

    /**
     * React: defaultProps
     */
    static defaultProps = {
        message: {}
    };

    render () {
        if(this._isObjectEmpty(this.props.message)) return null;
        var message = this.props.message;
        return (
            <div className="c-message">
                <div className="c-message--header">
                    <span className="c-message--user-name"><b>{message.user.username}</b> ({message.user.email})</span>
                    <span className="c-message--date-time">{message.date}</span>
                </div>
                <h2 className="c-message--content">{message.text}</h2>
                <div className="c-message--controls">
                    {this.props.disableLike ? (
                        <span className="c-message--control c-message--control__like-message">
                            <i className="fa fa-thumbs-o-up"/> {message.likes} Likes</span>
                    ) : (
                    <a href="#" className="c-message--control c-message--control__like-message"
                       onClick={this._likeMessage.bind(this, message.id)}>
                        <i className="fa fa-thumbs-o-up"/> {message.likes} Likes</a>
                    )}
                    <a href="#" className="c-message--control c-message--control__dislike-message"
                       onClick={this._showMessageReplies.bind(this, message)}>
                        <i className="fa fa-comment-o"/> {message.replies} Replies</a>
                </div>
            </div>
        );
    }

    _likeMessage = (messageID, event) => {
        event.preventDefault();
        if(typeof this.props.likeMessage === 'function'){
            this.props.likeMessage(messageID, Store.getState().UserReducer.user.token, Store.getState().UserReducer.user.id);
        }
    };

    _showMessageReplies = (message, event) => {
        event.preventDefault();
        if(typeof this.props.showMessageReplies === 'function'){
            this.props.showMessageReplies(message);
        }
    };

    _isObjectEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}
'use strict';
import React from 'react';
import ReplyMessageContainer from '../containers/ReplyMessageContainer.react.jsx';
import MessageForm from './MessageForm.react.jsx';
import Store from '../Store';
import styles from '../../css/components/message-replies.scss';

export default class MessageReplies extends React.Component {
    /**
     * React: propTypes
     */
    static propTypes = {
        showReplyForMessage: React.PropTypes.object,
        messageReplies: React.PropTypes.array,
        submitMessageReply: React.PropTypes.func,
        likeMessage: React.PropTypes.func,
    };

    render () {
        if(this.props.showReplyForMessage==null) return null;

        var likes = [];
        if(this.props.showReplyForMessage.fullLikesList.length>0){
            // var likeArray = [];
            this.props.showReplyForMessage.fullLikesList.forEach((like, key) => {
                // likeArray.push(like.username);
                likes.push(<span key={key} className="c-message--likes">{like.username}</span>)
            });
            // likes = likeArray.join(', ');
        }

        var originalMessage = this.props.showReplyForMessage;
        let messages = [];
        if (this.props.messageReplies.length != 0) {
            this.props.messageReplies.forEach((message, key) => {
                messages.push(
                    <ReplyMessageContainer
                        message={message}
                        key={key}
                        messageId={message.id}/>
                );
            });
        }

        return (
            <div className="c-message-replies">
                {originalMessage!=null? (
                    <div className="c-message-view">
                        <div className="c-message--header">
                            <span className="c-message--user-name"><b>{originalMessage.user.username}</b> ({originalMessage.user.email})</span>
                            <span className="c-message--date-time">{originalMessage.date} </span>
                        </div>
                        <h1 className="message-content">{originalMessage.text}</h1>
                        <div className="c-message--controls">
                            {this.props.disableLike ? (
                                <span className="c-message--control c-message--control__like-message">
                                    <i className="fa fa-thumbs-o-up"/> {originalMessage.likes} Likes({likes})</span>
                            ) : (
                                <span><a href="#" className="c-message--control c-message--control__like-message"
                                   onClick={this._likeMessage.bind(this, originalMessage.id)}>
                                    <i className="fa fa-thumbs-o-up"/> {originalMessage.likes} Likes </a>({likes})</span>
                            )}
                        </div>
                    </div>
                ) : null}

                {this.props.messageReplies.length!=0 ? (
                    <div className="c-message-reply-feed">
                        {messages}
                    </div>
                ) : null }

                {originalMessage!=null? (
                    <MessageForm submitMessage={this.props.submitMessageReply} originalMessageId={originalMessage.id} />
                ) : null}
            </div>
        );
    }

    _likeMessage = (messageID, event) => {
        event.preventDefault();
        if(typeof this.props.likeMessage === 'function'){
            this.props.likeMessage(messageID, Store.getState().UserReducer.user.token, Store.getState().UserReducer.user.id);
        }
    };
}
'use strict';
import React from 'react';
import MessageContainer from '../containers/MessageContainer.react.jsx';

export default class MessageFeed extends React.Component {
    /**
     * React: propTypes
     */
    static propTypes = {
        messages: React.PropTypes.array,
        likeMessage: React.PropTypes.func,
        dislikeMessage: React.PropTypes.func,
    };

    render () {
        let messages = [];
        if (this.props.messages != null) {
            this.props.messages.forEach((message, key) => {
                messages.push(
                    <MessageContainer
                        message={message}
                        key={key}
                        messageId={message.id}/>
                );
            });
        }

        return (
            <div className="c-message-feed">
                {messages}
            </div>
        );
    }
}
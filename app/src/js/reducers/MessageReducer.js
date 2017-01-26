"use strict";
import React from 'react';
import { MESSAGE_ACTION_TYPES } from '../actions/ActionTypes';
import * as MessageServices from '../lib/MessageServices'

const MessageReducer = function(state = {
    messages: [],
    showReplyForMessage: null,
    messageReplies: [],

}, action) {
    switch (action.type) {
        // LOAD_FEED
        case MESSAGE_ACTION_TYPES.LOAD_FEED:
            MessageServices.loadFeed();
            break;
        case MESSAGE_ACTION_TYPES.LOAD_FEED_SUCCESS:
            console.log(action)
            state = Object.assign({}, state, {
                messages: action.messages
            });
            break;
        case MESSAGE_ACTION_TYPES.LOAD_FEED_ERROR:
            var messages = MessageServices.loadFeed().messages;
            state = Object.assign({}, state, {
                messages: messages
            });
            break;

        // LIKE_MESSAGE
        case MESSAGE_ACTION_TYPES.LIKE_MESSAGE:
            MessageServices.likeMessage(action.messageId, action.userToken, action.userId);
            break;
        case MESSAGE_ACTION_TYPES.LIKE_MESSAGE_SUCCESS:
            console.log(action)
            var messages = state.messages;
            var newMessagesArray = [];
            messages.forEach(function(message){
                if(message.id==action.messageId){
                    var newLikesList = message.likesList;
                    newLikesList.push(action.userId);
                    newMessagesArray.push({
                        ...message,
                        likes: ++message.likes,
                        likesList: newLikesList
                    });
                }else {
                    newMessagesArray.push(message);
                }
            });

            if(state.showReplyForMessage.id==action.messageId){
                var newLikesList = state.showReplyForMessage.likesList;
                var newFullLikesList = state.showReplyForMessage.fullLikesList
                newFullLikesList.push({
                    username: "You",
                    id: 0
                });
                newLikesList.push(action.userId);
                newMessagesArray.push({
                    ...state.showReplyForMessage,
                    likes: ++state.showReplyForMessage.likes,
                    likesList: newLikesList,
                    fullLikesList: newFullLikesList
                });
            }

            state = Object.assign({}, state, {
                messages: newMessagesArray
            });
            break;
        case MESSAGE_ACTION_TYPES.LIKE_MESSAGE_ERROR:
            break;

        // SUBMIT_MESSAGE
        case MESSAGE_ACTION_TYPES.SUBMIT_MESSAGE:
            MessageServices.submitMessage(action.message, action.user);
            break;
        case MESSAGE_ACTION_TYPES.SUBMIT_MESSAGE_SUCCESS:
            MessageServices.loadFeed();
            break;
        case MESSAGE_ACTION_TYPES.SUBMIT_MESSAGE_ERROR:
            break;

        // SUBMIT_REPLY_MESSAGE
        case MESSAGE_ACTION_TYPES.SUBMIT_REPLY_MESSAGE:
            MessageServices.submitReplyMessage(action.message, action.user, action.originalMessage);
            break;
        case MESSAGE_ACTION_TYPES.SUBMIT_REPLY_MESSAGE_SUCCESS:
            MessageServices.loadFeed();
            MessageServices.showMessageReplies(action.originalMessageId);
            break;
        case MESSAGE_ACTION_TYPES.SUBMIT_REPLY_MESSAGE_ERROR:
            break;

        // SHOW_MESSAGE_REPLIES
        case MESSAGE_ACTION_TYPES.SHOW_MESSAGE_REPLIES:
            var response = MessageServices.showMessageReplies(action.message.id);
            break;
        case MESSAGE_ACTION_TYPES.SHOW_MESSAGE_REPLIES_SUCCESS:
            state = Object.assign({}, state, {
                showReplyForMessage: action.message,
                messageReplies: action.message.replyList
            });
            break;
        case MESSAGE_ACTION_TYPES.SHOW_MESSAGE_REPLIES_ERROR:
            break;
    }

    return state;
}

export default MessageReducer;
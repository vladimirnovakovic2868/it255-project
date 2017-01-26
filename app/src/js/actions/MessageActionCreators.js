"use strict";

import { MESSAGE_ACTION_TYPES } from './ActionTypes';

var MessageActionCreators = {
    loadFeed: (messages) => {
        return { type: MESSAGE_ACTION_TYPES.LOAD_FEED, messages: messages };
    },
    loadFeedSuccess: (messages) => {
        return { type: MESSAGE_ACTION_TYPES.LOAD_FEED_SUCCESS, messages: messages };
    },
    loadFeedError: (messages) => {
        return { type: MESSAGE_ACTION_TYPES.LOAD_FEED_ERROR, messages: messages };
    },

    // LIKE_MESSAGE: 'LIKE_MESSAGE',
    likeMessage: (messageId, userToken, userId) => {
        return { type: MESSAGE_ACTION_TYPES.LIKE_MESSAGE, messageId: messageId, userToken: userToken, userId: userId };
    },
    likeMessageSuccess: (messageId, userId) => {
        return { type: MESSAGE_ACTION_TYPES.LIKE_MESSAGE_SUCCESS, messageId: messageId, userId: userId };
    },
    likeMessageError: (error) => {
        return { type: MESSAGE_ACTION_TYPES.LIKE_MESSAGE_ERROR, error: error };
    },

    // SUBMIT_MESSAGE
    submitMessage: (message, user) => {
        return { type: MESSAGE_ACTION_TYPES.SUBMIT_MESSAGE, message: message, user: user };
    },
    submitMessageSuccess: (message, user) => {
        return { type: MESSAGE_ACTION_TYPES.SUBMIT_MESSAGE_SUCCESS, message: message, user: user };
    },
    submitMessageError: (message, user) => {
        return { type: MESSAGE_ACTION_TYPES.SUBMIT_MESSAGE_ERROR, message: message, user: user };
    },

    // SUBMIT_REPLY_MESSAGE
    submitReplyMessage: (message, user, originalMessage) => {
        return { type: MESSAGE_ACTION_TYPES.SUBMIT_REPLY_MESSAGE, message: message, user: user, originalMessage: originalMessage };
    },
    submitReplyMessageSuccess: (originalMessageId) => {
        console.log('[reply success', originalMessageId)
        return { type: MESSAGE_ACTION_TYPES.SUBMIT_REPLY_MESSAGE_SUCCESS, originalMessageId: originalMessageId };
    },
    submitReplyMessageError: (message, user) => {
        return { type: MESSAGE_ACTION_TYPES.SUBMIT_REPLY_MESSAGE_ERROR, message: message, user: user };
    },

    // SHOW_MESSAGE_REPLIES: 'SHOW_MESSAGE_REPLIES'
    showMessageReplies: (message) => {
        return { type: MESSAGE_ACTION_TYPES.SHOW_MESSAGE_REPLIES, message: message };
    },
    showMessageRepliesSuccess: (message) => {
        return { type: MESSAGE_ACTION_TYPES.SHOW_MESSAGE_REPLIES_SUCCESS, message: message };
    },
    showMessageRepliesError: (response) => {
        return { type: MESSAGE_ACTION_TYPES.SHOW_MESSAGE_REPLIES_ERROR, response: response };
    }
};

export default MessageActionCreators;
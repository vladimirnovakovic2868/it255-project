"use strict";

import ApiUrls from './ApiUrls';
import MessageActionCreators from '../actions/MessageActionCreators';
import Store from '../Store';

export function loadFeed() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var request = {
        method: "GET",
        headers: myHeaders,
        mode: 'cors'
    };

    return fetch(ApiUrls.LOAD_FEED, request).then(response=>response.json()).then(response=>{
        Store.dispatch(MessageActionCreators.loadFeedSuccess(response));
    });
}

export function showMessageReplies(messageId) {
    var myHeaders = new Headers();
    var callUrl = ApiUrls.LOAD_FEED + "?messageId=" + messageId;
    myHeaders.append("Content-Type", "application/json");

    var request = {
        method: "GET",
        headers: myHeaders,
        mode: 'cors',
        body: {
            messageId: messageId
        }
    };

    return fetch(callUrl, request).then(response=>response.json()).then(response=>{
        Store.dispatch(MessageActionCreators.showMessageRepliesSuccess(response[0]));
    });
}

export function likeMessage ( messageId, userToken, userId) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var request = {
        method: "POST",
        headers: myHeaders,
        mode: 'cors',
        body: JSON.stringify({
            message: messageId,
            userToken: userToken
        }),
    };

    return fetch(ApiUrls.LIKE_MESSAGE, request).then(response=>response.json()).then(response=>{
        Store.dispatch(MessageActionCreators.likeMessageSuccess(response.messageId, userId));
    });
}

export function submitMessage ( message, user) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var request = {
        method: "POST",
        headers: myHeaders,
        mode: 'cors',
        body: JSON.stringify({
            message: message,
            userToken: user
        }),
    };

    return fetch(ApiUrls.ADD_MESSAGE, request).then(response=>response.json()).then(response=>{
        Store.dispatch(MessageActionCreators.submitMessageSuccess(response));
    });
}

export function submitReplyMessage(message, user, originalMessage) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var request = {
        method: "POST",
        headers: myHeaders,
        mode: 'cors',
        body: JSON.stringify({
            message: message,
            userToken: user,
            originalMessageId: originalMessage
        }),
    };

    return fetch(ApiUrls.ADD_REPLY, request).then(response=>response.json()).then(response=>{
        Store.dispatch(MessageActionCreators.submitReplyMessageSuccess(response.originalMessageId));
    });
}

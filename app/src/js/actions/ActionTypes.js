"use strict";
import keyMirror from 'keymirror';

const USER_ACTION_TYPES = keyMirror({
    REGISTER_USER: null,
    REGISTER_USER_SUCCESS: null,
    REGISTER_USER_ERROR: null,
    LOGIN_USER: null,
    LOGIN_USER_SUCCESS: null,
    LOGIN_USER_ERROR: null,
    LOGOUT_USER: null,
    LOGOUT_USER_SUCCESS: null,
    LOGOUT_USER_ERROR: null,
    SEARCH_LOCAL_STORAGE: null,
    SEARCH_LOCAL_STORAGE_SUCCESS: null,
    SEARCH_LOCAL_STORAGE_ERROR: null,
});

const MESSAGE_ACTION_TYPES = keyMirror({
    LOAD_FEED: null,
    LOAD_FEED_SUCCESS: null,
    LOAD_FEED_ERROR: null,
    SUBMIT_MESSAGE: null,
    SUBMIT_MESSAGE_SUCCESS: null,
    SUBMIT_MESSAGE_ERROR: null,
    LIKE_MESSAGE: null,
    LIKE_MESSAGE_SUCCESS: null,
    LIKE_MESSAGE_ERROR: null,
    SUBMIT_REPLY_MESSAGE: null,
    SUBMIT_REPLY_MESSAGE_SUCCESS: null,
    SUBMIT_REPLY_MESSAGE_ERROR: null,
    SHOW_MESSAGE_REPLIES: null,
    SHOW_MESSAGE_REPLIES_SUCCESS: null,
    SHOW_MESSAGE_REPLIES_ERROR: null,
});

export { USER_ACTION_TYPES, MESSAGE_ACTION_TYPES }
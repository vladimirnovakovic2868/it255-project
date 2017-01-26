"use strict";

import { USER_ACTION_TYPES } from '../actions/ActionTypes';

var UserActions = {
    registerUser: (user={}) => {
        return { type: USER_ACTION_TYPES.REGISTER_USER, user: user };
    },

    registerUserSuccess: (response={}) => {
        return { type: USER_ACTION_TYPES.REGISTER_USER_SUCCESS, response: response };
    },

    registerUserError: (response={}) => {
        return { type: USER_ACTION_TYPES.REGISTER_USER_ERROR, response: response };
    },

    loginUser: (user={}) => {
        return { type: USER_ACTION_TYPES.LOGIN_USER, user: user };
    },

    loginUserSuccess: (response={}) => {
        return { type: USER_ACTION_TYPES.LOGIN_USER_SUCCESS, response: response };
    },

    loginUserError: (response={}) => {
        return { type: USER_ACTION_TYPES.LOGIN_USER_ERROR, response: response };
    },

    logoutUser: () => {
        return { type: USER_ACTION_TYPES.LOGOUT_USER };
    },

    checkUser: () => {
        return { type: USER_ACTION_TYPES.SEARCH_LOCAL_STORAGE };
    }
};

export default UserActions;
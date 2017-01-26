"use strict";

import { USER_ACTION_TYPES } from '../actions/ActionTypes';
import * as UserServices from '../lib/UserServices';

const UserReducer = function(state =
    {
        user: {
            name: '',
            email: '',
        },
    }, action) {

    switch (action.type) {
        case USER_ACTION_TYPES.REGISTER_USER:
            if(action.user.email!==''){
                UserServices.registerUser(action.user);
            }
            break;
        case USER_ACTION_TYPES.REGISTER_USER_SUCCESS:
            console.log(action);
            state = {...state, user: {
                ...state.user,
                email: action.response.email,
                name: action.response.username,
                token: action.response.token,
                id: action.response.id
            }};
            localStorage.setItem('user', JSON.stringify(state.user));
            break;
        case USER_ACTION_TYPES.REGISTER_USER_ERROR:
            console.log(action);
            alert(alert.response.error);
            break;

        case USER_ACTION_TYPES.LOGIN_USER:
            if(action.user.email!==''){
                UserServices.loginUser(action.user);
            }
            break;
        case USER_ACTION_TYPES.LOGIN_USER_SUCCESS:
            // console.log(action);
            state = {...state, user: {
                ...state.user,
                email: action.response.email,
                name: action.response.username,
                id: action.response.id,
                token: action.response.token
            }};
            localStorage.setItem('user', JSON.stringify(state.user));
            break;
        case USER_ACTION_TYPES.LOGIN_USER_ERROR:
            console.log(action);
            alert(alert.response.error);
            break;

        case USER_ACTION_TYPES.LOGOUT_USER:
            state = {...state, user: { name: '', email: '', token: '', id: '' }};
            localStorage.removeItem('user');
            break;

        case USER_ACTION_TYPES.SEARCH_LOCAL_STORAGE:
            var user = localStorage.getItem('user');
            if(user!==null){
                user = JSON.parse(user);
                state = {...state, user: { name: user.name, email: user.email, token: user.token, id: user.id }};
            }
            break;
    }

    return state;
}

export default UserReducer;
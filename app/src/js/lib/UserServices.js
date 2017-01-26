"use strict";

import ApiUrls from './ApiUrls';
import UserActionCreators from '../actions/UserActionCreators';
import Store from '../Store';

export function registerUser(userData = {}) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var request = {
        method: "POST",
        headers: myHeaders,
        mode: 'cors',
        body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            password: userData.password,

        }),
    };

    // return promise
    return fetch(ApiUrls.REGISTER, request).then(response=>response.json()).then(response=>{
        Store.dispatch(UserActionCreators.registerUserSuccess(response));
    });
}

export function loginUser(userData = {}) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var request = {
        method: "POST",
        headers: myHeaders,
        mode: 'cors',
        body: JSON.stringify({
            email: userData.email,
            password: userData.password,

        }),
    };

    // return promise
    return fetch(ApiUrls.LOGIN, request).then(response=>response.json()).then(response=>{
        Store.dispatch(UserActionCreators.loginUserSuccess(response));
    });
}
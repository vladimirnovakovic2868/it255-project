'use strict';
import styles from './css/style.scss';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import Store from './js/Store';
import AppContainer from './js/containers/AppContainer.react.jsx'
import UserActionCreators from './js/actions/UserActionCreators';
import MessageActionCreators from './js/actions/MessageActionCreators';

// preload data
Store.dispatch(UserActionCreators.checkUser());
Store.dispatch(MessageActionCreators.loadFeed());

render(
    <Provider store={Store}>
        <AppContainer/>
    </Provider>
    , document.getElementById('app'));
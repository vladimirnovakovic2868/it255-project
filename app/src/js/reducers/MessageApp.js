import { combineReducers } from 'redux'
import UserReducer from './UserReducer';
import MessageReducer from './MessageReducer';

const MessageApp = combineReducers({
    UserReducer,
    MessageReducer
});

export default MessageApp;
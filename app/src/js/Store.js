import { createStore } from 'redux';
import MessageApp from './reducers/MessageApp.js';

const Store = createStore(MessageApp);

export default Store;
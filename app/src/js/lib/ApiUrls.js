"use strict";
import Config from './Config';

/**
 * App config
 */
export default {
    // user
    REGISTER: Config.BASE_API_URL + 'register.php',
    LOGIN: Config.BASE_API_URL + 'login.php',
    // LOGOUT: Config.BASE_API_URL + 'register.php',

    // messages
    ADD_MESSAGE: Config.BASE_API_URL + 'add-message.php',
    ADD_REPLY: Config.BASE_API_URL + 'add-reply.php',
    LIKE_MESSAGE: Config.BASE_API_URL + 'like.php',
    LOAD_FEED: Config.BASE_API_URL + 'messages.php',
};

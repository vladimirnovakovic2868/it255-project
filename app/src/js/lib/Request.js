"use strict";

import request from 'request';
import Promise from 'bluebird';

/**
 * Returns promise for base request
 *
 * @param {Object} requestParams
 */
export function getRequestPromise(requestParams) {
    return new Promise((resolve, reject) => {
        baseRequest(requestParams,
            (error, response, body) => {
                if (error || response.statusCode >= 400) {
                    // return reject(new APIRequestError(null, error, response, body));
                }
                return resolve(body);
            }
        );
    });
}

/**
 * Returns promise for base request with authentication
 *
 * @param {Object} requestParams
 */
export function getAuthRequestPromise(requestParams) {
    // AuthStore.validateToken();

    requestParams = {
        ...requestParams,
        headers: {
            'Authorization': 'Basic ' + AuthStore.identity.authToken
        }
    };

    return new Promise((resolve, reject) => {
        baseRequest(requestParams,
            (error, response, body) => {
                if (error || response.statusCode >= 400) {
                    // return reject(new APIRequestError(null, error, response, body));
                }
                return resolve(body);
            }
        );
    });
}

/**
 * Base request
 */
var baseRequest = request.defaults({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    json: true
});

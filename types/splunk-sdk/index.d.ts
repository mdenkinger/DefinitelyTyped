// Type definitions for splunk-sdk 1.8
// Project: http://dev.splunk.com
// Definitions by: Markus Denkinger <https://github.com/mdenkinger>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/*~ Note that ES6 modules cannot directly export class objects.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */

/*~ If this module is a UMD module that exposes a global variable 'myClassLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
export as namespace splunkjs;

/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */
export = Service;

/*~ Write your module's methods and properties in this class */

declare interface Config {
    // - `scheme` (_string_): The scheme ("http" or "https") for accessing Splunk.
    scheme?: string;
    // - `host` (_string_): The host name (the default is "localhost").
    host?: string;
    // - `port` (_integer_): The port number (the default is 8089).
    port?: number;
    // - `username` (_string_): The Splunk account username, which is used to authenticate the Splunk instance.
    username?: string;
    // - `password` (_string_): The password, which is used to authenticate the Splunk instance.
    password?: string;
    // - `owner` (_string_): The owner (username) component of the namespace.
    owner?: string;
    // - `app` (_string_): The app component of the namespace.
    app?: string;
    // - `sessionKey` (_string_): The current session token.
    sessionKey?: string;
    // - `autologin` (_boolean_): `true` to automatically try to log in again if the session terminates, `false` if not (`true` by default).
    autologin?: boolean;
    // - `version` (_string_): The version string for Splunk, for example "4.3.2" (the default is "5.0").
    version?: string;
}

declare enum Sharing {
    USER = "user",
    APP = "app",
    GLOBAL = "global",
    SYSTEM = "system"
}

declare interface Namespace {
    owner?: string;
    app?: string;
    sharing?: Sharing;
}

declare class CompleteResponse {
    response?: any;
    status?: number;
    data?: any;
    error?: Error;
}

declare class Http {
    constructor();

    // TODO: check methods
    /**
     * Performs a GET request.
     *
     * @param {String} url The URL of the GET request.
     * @param {Object} headers An object of headers for this request.
     * @param {Object} params Parameters for this request.
     * @param {Number} timeout A timeout period.
     * @param {Function} callback The function to call when the request is complete: `(err, response)`.
     *
     * @method splunkjs.Http
     */
    //get: function(url, headers, params, timeout, callback)

    /**
     * Performs a POST request.
     *
     * @param {String} url The URL of the POST request.
     * @param {Object} headers  An object of headers for this request.
     * @param {Object} params Parameters for this request.
     * @param {Number} timeout A timeout period.
     * @param {Function} callback The function to call when the request is complete: `(err, response)`.
     *
     * @method splunkjs.Http
     */
    // post: function(url, headers, params, timeout, callback)

    /**
     * Performs a DELETE request.
     *
     * @param {String} url The URL of the DELETE request.
     * @param {Object} headers An object of headers for this request.
     * @param {Object} params Query parameters for this request.
     * @param {Number} timeout A timeout period.
     * @param {Function} callback The function to call when the request is complete: `(err, response)`.
     *
     * @method splunkjs.Http
     */
    // del: function(url, headers, params, timeout, callback)

    /**
     * Performs a request.
     *
     * This function sets up how to handle a response from a request, but
     * delegates calling the request to the `makeRequest` subclass.
     *
     * @param {String} url The encoded URL of the request.
     * @param {Object} message An object with values for method, headers, timeout, and encoded body.
     * @param {Function} callback The function to call when the request is complete: `(err, response)`.
     *
     * @method splunkjs.Http
     * @see makeRequest
     */
    // request: function(url, message, callback)

    /**
     * Encodes a dictionary of values into a URL-encoded format.
     *
     * @example
     *
     *      // should be a=1&b=2&b=3&b=4
     *      encode({a: 1, b: [2,3,4]})
     *
     * @param {Object} params The parameters to URL encode.
     * @return {String} The URL-encoded string.
     *
     * @function splunkjs.Http
     */
    // Http.encode = function(params)
}

declare class Context {
    /**
     * Converts a partial path to a fully-qualified path to a REST endpoint,
     * and if necessary includes the namespace owner and app.
     *
     * @param {String} path The partial path.
     * @param {String} namespace The namespace, in the format "_owner_/_app_".
     * @return {String} The fully-qualified path.
     *
     * @method splunkjs.Context
     */
    fullpath(path: string, namespace: Namespace): string;

    /**
     * Converts a partial path to a fully-qualified URL.
     *
     * @param {String} path The partial path.
     * @return {String} The fully-qualified URL.
     *
     * @method splunkjs.Context
     * @private
     */
    urlify(path: string): string;

    /**
     * Authenticates and logs in to a Splunk instance, then stores the
     * resulting session key.
     *
     * @param {Function} callback The function to call when login has finished: `(err, wasSuccessful)`.
     *
     * @method splunkjs.Context
     */
    login(callback: (err: Error, wasSuccessful: boolean) => void): void;

    /**
     * Logs the session out resulting in the removal of all cookies and the
     * session key.
     *
     * @param {Function} callback The function to call when logout has finished: `()`.
     *
     * @method splunkjs.Context
     */
    logout(callback: () => void): void;

    /**
     * Performs a GET request.
     *
     * @param {String} path The REST endpoint path of the GET request.
     * @param {Object} params The entity-specific parameters for this request.
     * @param {Function} callback The function to call when the request is complete: `(err, response)`.
     *
     * @method splunkjs.Context
     */
    get(
        path: string,
        params: any, // TODO: check any type
        done: (err: Error, response: CompleteResponse) => void
    ): void;

    /**
     * Performs a DELETE request.
     *
     * @param {String} path The REST endpoint path of the DELETE request.
     * @param {Object} params The entity-specific parameters for this request.
     * @param {Function} callback The function to call when the request is complete: `(err, response)`.
     *
     * @method splunkjs.Context
     */
    del(
        path: string,
        params: any, // TODO: check type
        done: (err: Error, response: CompleteResponse) => void
    ): void;

    /**
     * Performs a POST request.
     *
     * @param {String} path The REST endpoint path of the POST request.
     * @param {Object} params The entity-specific parameters for this request.
     * @param {Function} callback The function to call when the request is complete: `(err, response)`.
     *
     * @method splunkjs.Context
     */
    post(
        path: string,
        params: any, // TODO: check type
        done: (err: Error, response: CompleteResponse) => void
    ): void;

    /**
     * Issues an arbitrary HTTP request to the REST endpoint path segment.
     *
     * @param {String} path The REST endpoint path segment (with any query parameters already appended and encoded).
     * @param {String} method The HTTP method (can be `GET`, `POST`, or `DELETE`).
     * @param {Object} query The entity-specific parameters for this request.
     * @param {Object} post A dictionary of POST argument that will get form encoded.
     * @param {Object} body The body of the request, mutually exclusive with `post`.
     * @param {Object} headers Headers for this request.
     * @param {Function} callback The function to call when the request is complete: `(err, response)`.
     *
     * @method splunkjs.Context
     */
    request(
        path: string,
        method: string, // TODO: check type
        query: any, // TODO: check type
        post: any, // TODO: check type
        body: any, // TODO: check type
        headers: any, // TODO: check type
        done: (err: Error, response: CompleteResponse) => void
    ): void;

    /**
     * Compares the Splunk server's version to the specified version string.
     * TODO: check enum as return
     * Returns -1 if (this.version <  otherVersion),
     *          0 if (this.version == otherVersion),
     *          1 if (this.version >  otherVersion).
     *
     * @param {String} otherVersion The other version string, for example "5.0".
     *
     * @method splunkjs.Context
     */
    versionCompare(otherVersion: string): number;
}

declare class BaseService extends Context {}

declare class Service extends BaseService {
    constructor(http: Http, config: Config);

    /**
     * Creates a specialized version of the current `Service` instance for
     * a specific namespace context.
     *
     * @example
     *
     *      let svc = ...;
     *      let newService = svc.specialize("myuser", "unix");
     *
     * @param {string} owner The Splunk username, such as "admin". A value of "nobody" means no specific user. The "-" wildcard means all users.
     * @param {string} app The app context for this resource (such as "search"). The "-" wildcard means all apps.
     * @return {splunkjs.Service} The specialized `Service` instance.
     *
     * @method splunkjs.Service
     */
    specialize(owner: string, app: string): Service;
}

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */
declare namespace MyClass {
    export interface MyClassMethodOptions {
        width?: number;
        height?: number;
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = exports.Error = exports.sendResponse = void 0;
exports.sendResponse = (res, statusCode, data) => {
    res.status(statusCode).send(data);
};
class Error {
    constructor(props) {
        this.code = props.code === undefined ? '' : props.code;
        this.message = props.message === undefined ? '' : props.message;
        this.info = props.info === undefined ? '' : props.info;
    }
}
exports.Error = Error;
class Response {
    constructor(props) {
        this.data = props.data === undefined ? '' : props.data;
        this.error =
            props.error === undefined
                ? { code: '', message: '', info: '' }
                : new Error(props.error);
    }
}
exports.Response = Response;

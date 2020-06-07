"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSessionResponse = void 0;
const response_1 = require("./../../../../helpers/response");
class CreateSessionResponse extends response_1.Response {
    constructor(props) {
        super(props);
        this.data = props.data === undefined ? '' : props.data;
    }
}
exports.CreateSessionResponse = CreateSessionResponse;

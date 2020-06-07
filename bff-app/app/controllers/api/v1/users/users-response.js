"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserResponse = exports.UpdateUserResponse = exports.GetUserResponse = exports.GetUsersResponse = exports.AddUserResponse = void 0;
const response_1 = require("./../../../../helpers/response");
class AddUserResponse extends response_1.Response {
    constructor(props) {
        super(props);
        this.data = props.data === undefined ? '' : props.data;
    }
}
exports.AddUserResponse = AddUserResponse;
class GetUsersResponse extends response_1.Response {
    constructor(props) {
        super(props);
        this.data = props.data === undefined ? '' : props.data;
    }
}
exports.GetUsersResponse = GetUsersResponse;
class GetUserResponse extends response_1.Response {
    constructor(props) {
        super(props);
        this.data = props.data === undefined ? '' : props.data;
    }
}
exports.GetUserResponse = GetUserResponse;
class UpdateUserResponse extends response_1.Response {
    constructor(props) {
        super(props);
        this.data = props.data === undefined ? '' : props.data;
    }
}
exports.UpdateUserResponse = UpdateUserResponse;
class DeleteUserResponse extends response_1.Response {
    constructor(props) {
        super(props);
        this.data = props.data === undefined ? '' : props.data;
    }
}
exports.DeleteUserResponse = DeleteUserResponse;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCommentResponse = exports.UpdateCommentResponse = exports.GetCommentResponse = exports.GetCommentsResponse = exports.AddCommentResponse = void 0;
const response_1 = require("./../../../../helpers/response");
class AddCommentResponse extends response_1.Response {
    constructor(props) {
        super(props);
        this.data = props.data === undefined ? '' : props.data;
    }
}
exports.AddCommentResponse = AddCommentResponse;
class GetCommentsResponse extends response_1.Response {
    constructor(props) {
        super(props);
        this.data = props.data === undefined ? '' : props.data;
    }
}
exports.GetCommentsResponse = GetCommentsResponse;
class GetCommentResponse extends response_1.Response {
    constructor(props) {
        super(props);
        this.data = props.data === undefined ? '' : props.data;
    }
}
exports.GetCommentResponse = GetCommentResponse;
class UpdateCommentResponse extends response_1.Response {
    constructor(props) {
        super(props);
        this.data = props.data === undefined ? '' : props.data;
    }
}
exports.UpdateCommentResponse = UpdateCommentResponse;
class DeleteCommentResponse extends response_1.Response {
    constructor(props) {
        super(props);
        this.data = props.data === undefined ? '' : props.data;
    }
}
exports.DeleteCommentResponse = DeleteCommentResponse;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRequestMiddlewares = void 0;
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const setParsers = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use(cookie_parser_1.default());
};
exports.setRequestMiddlewares = (app) => {
    setParsers(app);
};

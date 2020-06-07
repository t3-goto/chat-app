"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setResponseMiddlewares = void 0;
const tslib_1 = require("tslib");
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-methods': 'GET, PUT, POST, DELETE, PATCH',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token',
};
const setHeaders = (app) => {
    app.use((req, res, next) => {
        for (const key in HEADERS) {
            res.header(key, HEADERS[key]);
        }
        next();
    });
};
const setHelmet = (app) => {
    app.use(helmet_1.default());
};
exports.setResponseMiddlewares = (app) => {
    setHeaders(app);
    setHelmet(app);
};

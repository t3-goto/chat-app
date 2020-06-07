"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HEADERS = [
    {
        key: 'Access-Control-Allow-Origin',
        value: '*',
    },
    {
        key: 'Access-Control-Allow-methods',
        value: 'GET, PUT, POST, DELETE, PATCH',
    },
    {
        key: 'Access-Control-Allow-Headers',
        value: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token',
    },
];
const setHeaders = (app) => {
    app.use((req, res, next) => {
        for (let header of HEADERS) {
            res.header(header.key, header.value);
        }
        next();
    });
};
exports.responseMiddleware = (app) => {
    setHeaders(app);
};

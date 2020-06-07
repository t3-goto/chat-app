"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProd = () => process.env.NODE_ENV === 'production';
exports.isDev = () => process.env.NODE_ENV === 'development';

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const algorithm = 'AES-128-CBC';
const cipher = crypto_1.default.createCipher(algorithm, new Date().toString());
let encrypted = cipher.update(crypto_1.default.randomBytes(32).toString(), 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(`Random secret number was generated!`);
console.log(`Put the following line to your .envrc`);
for (let i = 0; i < 3; i += 1) {
    console.log('');
}
console.log(`export SECRET_KEY_BASE=${encrypted}`);
for (let i = 0; i < 3; i += 1) {
    console.log('');
}

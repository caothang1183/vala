"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const auth_1 = __importDefault(require("./auth"));
const passport_1 = __importDefault(require("./passport"));
const authentication = {
    auth: auth_1.default,
    passport: passport_1.default,
};
module.exports = authentication;
//# sourceMappingURL=index.js.map
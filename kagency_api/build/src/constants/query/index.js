"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const role_query_1 = __importDefault(require("./role_query"));
const user_query_1 = __importDefault(require("./user_query"));
const project_query_1 = __importDefault(require("./kagency/project_query"));
const queries = {
    ROLEQUERIES: role_query_1.default,
    USERQUERIES: user_query_1.default,
    PROJECTQUERIES: project_query_1.default
};
module.exports = queries;
//# sourceMappingURL=index.js.map
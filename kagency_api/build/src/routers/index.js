"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const document_1 = __importDefault(require("./document"));
const api_1 = __importDefault(require("./api"));
const kagency_api_1 = __importDefault(require("./kagency_api"));
const routes = {
    documentRoutes: document_1.default,
    apiRoutes: api_1.default,
    kagencyApiRoutes: kagency_api_1.default,
};
module.exports = routes;
//# sourceMappingURL=index.js.map
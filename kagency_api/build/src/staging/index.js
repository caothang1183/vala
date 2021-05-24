"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.get("/staging", (_, res, next) => res.send("staging"));
module.exports = route;
//# sourceMappingURL=index.js.map
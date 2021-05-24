"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _database_1 = __importDefault(require("@database"));
const _queries_1 = require("@queries");
const _authentication_1 = require("@authentication");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/roles", _authentication_1.auth.verifyAccess, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield _database_1.default.queryDB(_queries_1.ROLEQUERIES.FIND_ALL());
        return res.status(200).send({ data: result.rows });
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
router.get("/roles/:id", _authentication_1.auth.verifyAccess, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield _database_1.default.queryDB(_queries_1.ROLEQUERIES.FIND_BY_ID(req.params.id));
        if (result.rows.length == 0)
            return res.status(404).send({ message: "Data not found" });
        return res.status(200).send(result.rows[0]);
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
router.post("/roles", _authentication_1.auth.verifyAccess, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const data = {
            name: !name ? "" : name,
            description: !description ? "" : description,
        };
        const result = yield _database_1.default.queryDB(_queries_1.ROLEQUERIES.CREATE(data));
        return res.status(200).send({ role: result.rows });
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
router.post("/roles/:id", _authentication_1.auth.verifyAccess, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultCurrentRole = yield _database_1.default.queryDB(_queries_1.ROLEQUERIES.FIND_BY_ID(req.params.id));
        if (resultCurrentRole.rows.length == 0)
            return res.status(404).send({ message: "Data not found" });
        const currentRole = resultCurrentRole.rows[0];
        const { name, description } = req.body;
        const data = {
            name: !name ? currentRole.name : name,
            description: !description ? currentRole.description : description,
        };
        const result = yield _database_1.default.queryDB(_queries_1.ROLEQUERIES.UPDATE_BY_ID(req.params.id, data));
        return res.status(200).send(result.rows[0]);
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
module.exports = router;
//# sourceMappingURL=roles.js.map
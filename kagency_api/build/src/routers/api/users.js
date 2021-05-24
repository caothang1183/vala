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
const bcrypt_1 = __importDefault(require("bcrypt"));
const _authentication_1 = require("@authentication");
const _utils_1 = require("@utils");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
router.post("/kauth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email);
        const result = yield _database_1.default.queryDB(_queries_1.USERQUERIES.FIND_BY_EMAIL(email));
        const user = result.rows[0];
        if (result.rowCount === 0)
            return res.json({ message: `user's not exist` });
        if (user.role_id === 0)
            return res.json({ message: `user doesn't have permission` });
        if (!bcrypt_1.default.compareSync(password, user.password))
            return res.sendStatus(403);
        jwt.sign({ user, key: "kagency" }, "kagencySecret", { expiresIn: "86400s" }, (err, token) => {
            if (err)
                return res.send(err);
            return res.json({ "access-token": `Kagency|${token}` });
        });
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
router.post("/users/register", _authentication_1.auth.verifyOwner, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!email || !password || !first_name || !last_name)
            res.status(400).send({ message: "missing fields" });
        if (password.length < 6)
            res.status(400).send({ message: "password min lenght 6 characters" });
        if (!_utils_1.StringUtils.checkValidEmail(email))
            res.status(400).send({ message: "email is not valid" });
        const result = yield _database_1.default.queryDB(_queries_1.USERQUERIES.FIND_BY_EMAIL(email));
        if (result.rowCount > 0)
            res.status(400).send({ message: "email is already exist" });
        bcrypt_1.default.genSalt(10, (err, salt) => {
            bcrypt_1.default.hash(password, salt, (err, hash) => {
                const data = {
                    uuid: uuidv4(),
                    firstName: first_name,
                    lastName: last_name,
                    email: email,
                    password: hash,
                };
                _database_1.default.queryDB(_queries_1.USERQUERIES.CREATE(data));
                return res.status(200).send({ message: "register data successfully" });
            });
        });
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
router.get("/users", _authentication_1.auth.verifyAccess, _authentication_1.auth.verifyDevelopment, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield _database_1.default.queryDB(_queries_1.USERQUERIES.FIND_ALL());
        return res.status(200).send({ data: result.rows });
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
module.exports = router;
//# sourceMappingURL=users.js.map
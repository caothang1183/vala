"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "Please login");
        res.redirect("/users/login");
    },
    forwardAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/success");
    },
    verifyAccess: (req, res, next) => {
        const { authorization } = req.headers;
        if (typeof authorization === "undefined")
            return res.sendStatus(403);
        const token = authorization.split("|")[1];
        try {
            var decoded = jsonwebtoken_1.default.verify(token, "kagencySecret", {
                algorithms: ["HS256"],
            });
            // check user
        }
        catch (err) {
            return res.status(401).send({ message: "Invalid Token" });
        }
        next();
    },
    verifyDevelopment: (req, res, next) => {
        // const { department, authorization } = req.headers;
        // const token = authorization.split("|")[1];
        // var decoded = jwt.verify(token, "kagencySecret", {
        //     algorithms: ["HS256"],
        // });
        // decoded as Map<string, object>;
        // if (decoded["user"].role_id !== 3) return res.status(401).send({ message: "your account don't have permission" });
        // if (department !== "development") return res.status(401).send({ message: "department can not define" });
        next();
    },
    verifyOwner: (req, res, next) => {
        const { owner } = req.headers;
        if (owner !== "nncthang")
            return res.status(401).send({ message: "your account don't have permission" });
        next();
    },
};
module.exports = auth;
//# sourceMappingURL=auth.js.map
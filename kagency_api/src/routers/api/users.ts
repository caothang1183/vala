import  db from '@database';
import { USER_QUERIES as query } from '@queries';
import bcrypt from 'bcrypt';
import { auth } from '@authentication';
import { StringUtils } from '@utils';
import express from 'express';
const router = express.Router();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

router.post("/kauth", async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        const result = await db.queryDB(query.FIND_BY_EMAIL(email));
        const user = result.rows[0];
        if (result.rowCount === 0) return res.status(404).json({ message: `user's not exist` });
        if (user.role_id === 0) return res.status(403).json({ message: `user doesn't have permission` });
        if (!bcrypt.compareSync(password, user.password)) return res.sendStatus(403);
        jwt.sign({ user, key: "kagency" }, "kagencySecret", { expiresIn: "86400s" }, (err: any, token: string) => {
            if (err) return res.status(403).send(err);
            return res.status(200).json({ "accessToken": `Kagency|${token}` });
        });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.post("/users/register", auth.verifyOwner, async (req: any, res: any) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!email || !password || !first_name || !last_name) res.status(400).send({ message: "missing fields" });

        if (password.length < 6) res.status(400).send({ message: "password min lenght 6 characters" });

        if (!StringUtils.checkValidEmail(email)) res.status(400).send({ message: "email is not valid" });

        const result = await db.queryDB(query.FIND_BY_EMAIL(email));
        if (result.rowCount > 0) res.status(400).send({ message: "email is already exist" });

        bcrypt.genSalt(10, (err: any, salt: any) => {
            bcrypt.hash(password, salt, (err: any, hash: string) => {
                const data = {
                    id: uuidv4(),
                    firstName: first_name,
                    lastName: last_name,
                    email: email,
                    password: hash,
                };
                db.queryDB(query.CREATE(data));
                return res.status(200).send({ message: "register data successfully" });
            });
        });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.get("/users", auth.verifyAccess, auth.verifyDevelopment, async (req: any, res: any) => {
    try {
        const result = await db.queryDB(query.FIND_ALL());
        return res.status(200).send({ data: result.rows });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

module.exports = router;

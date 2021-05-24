import db from '@database';
import { ROLE_QUERIES as query} from '@queries';
import { auth } from '@authentication';
import express from 'express';
const router = express.Router();

router.get("/roles", auth.verifyAccess, async (_req: any, res: any) => {
    try {
        const result = await db.queryDB(query.FIND_ALL());
        return res.status(200).send(result.rows);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.get("/roles/:id", auth.verifyAccess, async (req: any, res: any) => {
    try {
        const result = await db.queryDB(query.FIND_BY_ID(req.params.id));
        if (result.rows.length == 0) return res.status(404).send({ message: "Data not found" });
        return res.status(200).send(result.rows[0]);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.post("/roles", auth.verifyAccess, async (req: any, res: any) => {
    try {
        const { name, description } = req.body;
        const data = {
            name: !name ? "" : name,
            description: !description ? "" : description,
        };
        const result = await db.queryDB(query.CREATE(data));
        return res.status(200).send({ role: result.rows });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.post("/roles/:id", auth.verifyAccess, async (req: any, res: any) => {
    try {
        const resultCurrentRole = await db.queryDB(query.FIND_BY_ID(req.params.id));
        if (resultCurrentRole.rows.length == 0) return res.status(404).send({ message: "Data not found" });
        const currentRole = resultCurrentRole.rows[0];
        const { name, description } = req.body;

        const data = {
            name: !name ? currentRole.name : name,
            description: !description ? currentRole.description : description,
        };
        const result = await db.queryDB(query.UPDATE_BY_ID(req.params.id, data));
        return res.status(200).send(result.rows[0]);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

module.exports = router;

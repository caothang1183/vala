import db from "@database";
import { CATE_QUERIES as query } from "@queries";
import { auth } from "@authentication";
import express from "express";
const router = express.Router();

router.get("/cate", async (_req: any, res: any) => {
  try {
    const result = await db.queryDB(query.FIND_ALL());
    return res.status(200).send(result.rows);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.get("/cate/:id", async (req: any, res: any) => {
  try {
    const result = await db.queryDB(query.FIND_BY_ID(req.params.id));
    if (result.rows.length == 0)
      return res.status(404).send({ message: "Data not found" });
    return res.status(200).send(result.rows[0]);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.post("/cate", auth.verifyAccess, async (req: any, res: any) => {
  try {
    var arrData = [];
    var values = new Array();
    if (req.body[0] === undefined) arrData.push(req.body);
    else {
      arrData = req.body;
    }
    arrData.forEach((cate: any) => {
      const { name } = cate;
      if (name === "" || name === undefined)
      return res.status(404).send({ message: "params' not found" });
      let value = [name];
      values.push(value);
    });
    db.queryDB(query.CREATE(values));
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.post("/cate/:id", auth.verifyAccess, async (req, res) => {
  try {
    const resultCurrentCate = await db.queryDB(
      query.FIND_BY_ID(req.params.id)
    );
    if (resultCurrentCate.rows.length == 0)
      return res.status(404).send({ message: "Data not found" });
    const currentCate = resultCurrentCate.rows[0];
    const { name } = req.body;
    const data = {
      name: !name ? currentCate.name : name,
    };
    const result = await db.queryDB(
      query.UPDATE_BY_ID(req.params.id, data)
    );
    return res.status(200).send(result.command);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete("/cate/:id", auth.verifyAccess, async (req, res) => {
  try {
    const result = await db.queryDB(query.DELETE_BY_ID(req.params.uuid));
    return res.status(200).send(result.command);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete("/cate", auth.verifyAccess, async (req, res) => {
  try {
    const result = await db.queryDB(query.DELETE_ALL());
    return res.status(200).send(result.command);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete(
  "/cate-clear",
  auth.verifyAccess,
  auth.verifyOwner,
  async (req, res) => {
    try {
      const result = await db.queryDB(query.CLEAR_TABLE());
      return res.status(200).send(result.command);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
);

export = router;

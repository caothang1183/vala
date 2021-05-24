import db from "@database";
import { BLOG_QUERIES as query, CATE_QUERIES as categoryQuery } from "@queries";
import { auth } from "@authentication";
import express from "express";
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.get("/blogs", async (_req: any, res: any) => {
  try {
    const result = await db.queryDB(query.FIND_ALL());
    return res.status(200).send(result.rows);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.get("/blogs/:id", async (req: any, res: any) => {
  try {
    const result = await db.queryDB(query.FIND_BY_ID(req.params.id));
    if (result.rows.length == 0)
      return res.status(404).send({ message: "Data not found" });
    return res.status(200).send(result.rows[0]);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.post("/blogs", auth.verifyAccess, async (req: any, res: any) => {
  try {
    var arrData = [];
    var values = new Array();
    if (req.body[0] === undefined) arrData.push(req.body);
    else {
      arrData = req.body;
    }
    arrData.forEach((blog: any) => {
      const { url, title, content, category_id, created_by, updated_by } = blog;

      let value = [
        uuidv4(),
        !url ? "" : url,
        !title ? "" : title,
        !content ? "" : content,
        !category_id ? 0 : category_id,
        !created_by ? "Unknown" : created_by,
        !updated_by ? "Unknown" : updated_by,
      ];
      values.push(value);
    });
    db.queryDB(query.CREATE(values));
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.post("/blogs/:id", auth.verifyAccess, async (req, res) => {
  try {
    const resultCurrentBlog = await db.queryDB(query.FIND_BY_ID(req.params.id));
    if (resultCurrentBlog.rows.length == 0)
      return res.status(404).send({ message: "Data not found" });
    const currentBlog = resultCurrentBlog.rows[0];
    const { url, title, content, category_id, created_by, updated_by } =
      req.body;

    const data = {
      url: !url ? currentBlog.url : url,
      title: !title ? currentBlog.title : title,
      category_id: !category_id ? currentBlog.category_id : category_id,
      content: !content ? currentBlog.content : content,
      updated_by: !updated_by ? "Unknown" : updated_by,
      created_by: !created_by ? "Unknown" : created_by,
    };
    const result = await db.queryDB(query.UPDATE_BY_ID(req.params.id, data));
    return res.status(200).send(result.command);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete("/blogs/:uuid", auth.verifyAccess, async (req, res) => {
  try {
    const result = await db.queryDB(query.DELETE_BY_ID(req.params.uuid));
    return res.status(200).send(result.command);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete("/blogs", auth.verifyAccess, async (req, res) => {
  try {
    const result = await db.queryDB(query.DELETE_ALL());
    return res.status(200).send(result.command);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete(
  "/blogs-clear",
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

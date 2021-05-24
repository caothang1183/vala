import db from "@database";
import {
  PROJECT_QUERIES as query,
  TOPIC_QUERIES as topicQuery,
} from "@queries";
import { auth } from "@authentication";
import express from "express";
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.get("/projects", async (_req: any, res: any) => {
  try {
    const result = await db.queryDB(query.FIND_ALL());
    return res.status(200).send(result.rows);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.get("/projects/:id", async (req: any, res: any) => {
  try {
    const result = await db.queryDB(query.FIND_BY_ID(req.params.id));
    if (result.rows.length == 0)
      return res.status(404).send({ message: "Data not found" });
    return res.status(200).send(result.rows);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.post("/projects", auth.verifyAccess, async (req: any, res: any) => {
  try {
    var arrData = [];
    if (req.body[0] === undefined) arrData.push(req.body);
    else {
      arrData = req.body;
    }
    arrData.forEach(async (project: any) => {
      const {
        url,
        project_name,
        title,
        topic,
        description,
        content,
        created_by,
        updated_by,
      } = project;

      var topicData = await db.queryDB(topicQuery.FIND_BY_NAME(topic));
      if (topicData.rowCount === 0) {
        topicData = await db.queryDB(topicQuery.CREATE([[topic]]));
        topicData = await db.queryDB(topicQuery.FIND_BY_NAME(topic));
      }

      let value = [
        uuidv4(),
        !url ? "" : url,
        !project_name ? "" : project_name,
        !title ? "" : title,
        topicData.rows[0].id,
        !description ? "" : description,
        !content ? "" : content,
        !created_by ? "Unknown" : created_by,
        !updated_by ? "Unknown" : updated_by,
      ];
      await db.queryDB(query.CREATE([value]));
    });


    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.post("/projects/:id", auth.verifyAccess, async (req, res) => {
  try {
    const resultCurrentProject = await db.queryDB(
      query.FIND_BY_ID(req.params.id)
    );
    if (resultCurrentProject.rows.length == 0)
      return res.status(404).send({ message: "Data not found" });
    const currentProject = resultCurrentProject.rows[0];
    const {
      url,
      project_name,
      title,
      topic_id,
      description,
      content,
      created_by,
      updated_by,
    } = req.body;

    const data = {
      url: !url ? currentProject.url : url,
      project_name: !project_name ? currentProject.project_name : project_name,
      title: !title ? currentProject.title : title,
      topic_id: !topic_id ? currentProject.topic_id : topic_id,
      description: !description ? currentProject.description : description,
      content: !content ? currentProject.content : content,
      updated_by: !updated_by ? "Unknown" : updated_by,
      created_by: !created_by ? "Unknown" : created_by,
    };
    const result = await db.queryDB(query.UPDATE_BY_ID(req.params.id, data));
    return res.status(200).send(result.command);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete("/projects/:uuid", auth.verifyAccess, async (req, res) => {
  try {
    const result = await db.queryDB(query.DELETE_BY_ID(req.params.uuid));
    return res.status(200).send(result.command);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete("/projects", auth.verifyAccess, async (req, res) => {
  try {
    const result = await db.queryDB(query.DELETE_ALL());
    return res.status(200).send(result.command);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete(
  "/projects-clear",
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

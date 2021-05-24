import express from 'express';
const roleRoutes = require('./roles')
const userRoutes = require('./users')
const projectRoutes = require('./projects')
const cateRoutes = require('./categories')
const blogRoutes = require('./blogs')
const topicRoutes = require('./topics')

const router = express.Router();

router.use(express.json());
router.get("/", async (_req, res) => {
  try {
    res.send({ message: "Welcome to Kagency API" });
  } catch (error) {
    console.error(error.message);
  }
});

router.use(roleRoutes);
router.use(userRoutes);
router.use(projectRoutes);
router.use(cateRoutes);
router.use(blogRoutes);
router.use(topicRoutes);

export = router;

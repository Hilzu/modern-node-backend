import express from "express";

const root = (req, res) => {
  req.log.info("Hello world!");
  res.json({ hello: "world" });
};

const router = new express.Router();

router.get("/", root);

export default router;

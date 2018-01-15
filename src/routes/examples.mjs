import express from "express";
import validate from "../middleware/validate";
import StatusError from "../error/StatusError";

const router = new express.Router();

const rootRoute = (req, res) => {
  req.log.info("Hello world!");
  res.json({ hello: "world" });
};
router.get("/", rootRoute);

const echoSchema = {
  query: {
    properties: { input: { type: "string" } },
    required: ["input"],
  },
};
const echoRoute = (req, res) => {
  res.json({ input: req.query.input });
};
router.get("/echo", validate(echoSchema), echoRoute);

const calculateSchema = {
  body: {
    properties: {
      lho: { type: "number" },
      rho: { type: "number" },
      op: { enum: ["+", "-"] },
    },
    required: ["lho", "rho", "op"],
  },
};
const calculateRoute = (req, res) => {
  const { lho, rho, op } = req.body;
  let result = null;
  if (op === "+") {
    result = lho + rho;
  } else if (op === "-") {
    result = lho - rho;
  } else {
    throw new StatusError("Invalid op", 400);
  }
  res.json({ result });
};
router.post("/calculate", validate(calculateSchema), calculateRoute);

export default router;

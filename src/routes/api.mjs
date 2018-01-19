import fs from "fs";
import express from "express";
import SwaggerUI from "swagger-ui-dist";
import yaml from "js-yaml";
import Ajv from "ajv";
import ValidationError from "../error/ValidationError"

const ajv = new Ajv();


const apiSpec = yaml.safeLoad(fs.readFileSync("api/openapi.yaml"), "utf-8");

const findFromSpec = (method, path) => {
  try {
    return apiSpec.paths[path][method];
  } catch (err) {
    throw new Error(
      `Path=${path} with method=${method} not found from OpenAPI spec`,
    );
  }
};

const openAPIValidate = (method, path) => {
  const spec = findFromSpec(method, path);
  const schema = spec.requestBody.content['application/json'].schema
  const validator = ajv.compile(schema);
  const validate = (req, res, next) => {
    const valid = validator(req.body)
    if (valid) {
      next()
    } else {
      req.log.warn({ errors: validator.errors }, "Validation failed");
      next(
        new ValidationError(
          "Error while validating request parameters",
          validator.errors,
        ),
      );
    }
  };
  return validate;
};

const router = new express.Router();

router.use("/docs", express.static(SwaggerUI.absolutePath()));
router.use("/docs/api/", express.static("api"));

router.post("/api", openAPIValidate("post", "/api"), (req, res, next) => {
  res.json({ ok: true })
});

export default router;

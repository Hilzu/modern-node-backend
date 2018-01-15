import Ajv from "ajv";
import ValidationError from "../error/ValidationError";

const ajv = new Ajv({ allErrors: true });

const createValidatorMiddleware = schemas => {
  const { body, params, query } = schemas;
  const schema = {
    title: "Request parameters",
    properties: {
      body: body || {},
      params: params || {},
      query: query || {},
    },
  };
  const validator = ajv.compile(schema);
  const validate = (req, res, next) => {
    const valid = validator(req);
    if (valid) {
      next();
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

export default createValidatorMiddleware;

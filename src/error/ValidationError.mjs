export default class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = this.constructor.name;
    this.status = 400;
    this.data = errors;
  }
}

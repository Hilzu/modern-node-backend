export default class StatusError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

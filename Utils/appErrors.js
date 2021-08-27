class appError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = "failed"
    this.statusCode = statusCode;
    this.isOpertional = true;
    //we have all the stack error inside the Error.stack
    // Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = appError;

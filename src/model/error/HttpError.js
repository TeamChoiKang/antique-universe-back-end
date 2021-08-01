class HttpError extends Error {
  constructor(statusCode, statusText, ...args) {
    super(statusText, ...args);
    this.statusText = statusText;
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;

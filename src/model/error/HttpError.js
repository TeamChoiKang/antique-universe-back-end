class HttpError extends Error {
  constructor(statusCode, statusText, ...args) {
    super(statusText, ...args);
    this.statusText = statusText;
    this.statusCode = statusCode;
  }

  getStatusCode() {
    return this.statusCode;
  }

  getStatusText() {
    return this.statusText;
  }
}

module.exports = HttpError;

const HttpClient = require('./HttpClient');

class ApiClient {
  constructor() {
    this.instance = new HttpClient();
  }
}

module.exports = ApiClient;

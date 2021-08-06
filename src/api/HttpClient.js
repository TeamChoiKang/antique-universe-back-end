const http = require('@/package/http');

const defaultHeader = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

class HttpClient {
  async get(url, header) {
    const response = await http(url, {
      method: 'GET',
      headers: header || defaultHeader,
    });
    const result = await response.json();
    return result;
  }

  async post(url, body) {
    const response = await http(url, {
      method: 'POST',
      headers: defaultHeader,
      body,
    });
    const result = await response.json();
    return result;
  }

  async put(url, body) {
    const response = await http(url, {
      method: 'PUT',
      headers: defaultHeader,
      body,
    });
    const result = await response.json();
    return result;
  }

  async delete(url) {
    const response = await http(url, {
      method: 'DELETE',
      headers: defaultHeader,
    });
    const result = await response.json();
    return result;
  }
}

module.exports = HttpClient;

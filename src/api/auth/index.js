const ApiClient = require('@/api');

class AuthClient extends ApiClient {
  async validationOAuthToken(url, oAuthtoken) {
    const header = { Authorization: `Bearer ${oAuthtoken}` };
    const { id: userId } = await this.instance.get(url, header);
    return userId;
  }
}

module.exports = new AuthClient();

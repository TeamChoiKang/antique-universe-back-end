class OAuthStrategy {
  validateToken() {
    return new Error('no match oauth service');
  }
}

module.exports = OAuthStrategy;

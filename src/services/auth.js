const { KAKAO_OAUTH_URI } = require('@/constants');
const fetch = require('node-fetch');

exports.validateToken = async token => {
  const response = await fetch(`${KAKAO_OAUTH_URI}/user/access_token_info`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });
  const { id } = await response.json();
  return id;
};

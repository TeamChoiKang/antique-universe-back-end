const { checkHttpStatus } = require('@/utils/validation');
const fetch = require('node-fetch');

exports.validationOAuthToken = async (url, oAuthtoken) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: oAuthtoken,
    },
  });
  checkHttpStatus(response);
  const { id } = await response.json();
  return id;
};

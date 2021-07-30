const fetch = require('node-fetch');

exports.validationToken = async (url, token) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });
  const { id } = await response.json();
  return id;
};

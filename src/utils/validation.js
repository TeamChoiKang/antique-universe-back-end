exports.checkRequiredParams = params => {
  const valid = Object.keys(params).every(key => !!params[key]);
  if (valid) {
    return params;
  }
  throw Error(`HTTP Error Request: required prams are missing`);
};

exports.checkHttpStatus = response => {
  if (response.ok) {
    return response;
  }
  throw Error(`HTTP Error Response: ${response.status} ${response.statusText}`);
};

const errorStatus = {
  error: true,
  success: false,
};

const successStatus = {
  error: false,
  success: true,
};

const httpResponses = (statusCode, response, message, data = null) => {
  const status = statusCode > 200 ? errorStatus : successStatus;
  return response.status(statusCode).json({
    message,
    ...status,
    data,
  });
};

export {errorStatus, successStatus, httpResponses};

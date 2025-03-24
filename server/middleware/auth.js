import jwt from 'jsonwebtoken';
import {httpResponses} from '../utils/constant.js';

const auth = async (request, response, next) => {
  try {
    const token =
      request.cookies.accessToken ||
      request?.headers?.authorization?.split(' ')[1];
    if (!token) {
      return httpResponses(401, response, 'Provide token');
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    if (!decode) {
      return httpResponses(401, response, 'Unauthorized access');
    }

    request.userId = decode.id;
    next();
  } catch (error) {
    return httpResponses(500, response, error.message || error);
  }
};

export default auth;

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js';
dotenv.config();

const generatedAccessToken = async (userId) => {
  try {
    const token = jwt.sign({id: userId}, process.env.SECRET_KEY_ACCESS_TOKEN, {
      expiresIn: '5h',
    });

    return token;
  } catch (error) {}
};

const genetatedRefreshToken = async (userId) => {
  try {
    const refresh_token = jwt.sign(
      {id: userId},
      process.env.SECRET_KEY_REFRESH_TOKEN,
      {
        expiresIn: '7d',
      }
    );
    // update refresh token
    await UserModel.updateOne(
      {
        _id: userId,
      },
      {refresh_token}
    );

    return refresh_token;
  } catch (error) {}
};

const genetatedOtp = () => {
  return Math.floor(Math.random() * 900000) + 100000;
};

export {generatedAccessToken, genetatedRefreshToken, genetatedOtp};

import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {
  forgotPasswordTemplate,
  verifyEmailTemplate,
} from '../utils/emailTemplate.js';
import {httpResponses} from '../utils/constant.js';
import {
  generatedAccessToken,
  generatedOtp,
  generatedRefreshToken,
} from '../utils/generated.js';
import uploadImageCloudiary from '../utils/uploadImage.js';
dotenv.config();

const cookieOptions = {
  htmlOnly: true,
  secure: true,
  sameSite: 'None',
};

// register
export async function registerUserController(request, response) {
  try {
    const {name, email, password} = request.body;
    if (!name || !email || !password) {
      return httpResponses(400, response, 'provide email, name, password');
    }

    const user = await UserModel.findOne({email});

    if (user) {
      return httpResponses(400, response, 'Already register email');
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: 'Verify email from Food Order',
      html: verifyEmailTemplate(name, verifyEmailUrl),
    });

    // successful
    return httpResponses(200, response, 'User register Successfully', save);
  } catch (error) {
    return httpResponses(500, response, error.message || error);
  }
}

// verify email
export async function verifyEmailController(request, response) {
  try {
    const {code} = request.body;
    const user = await UserModel.findOne({_id: code});
    if (!user) {
      return httpResponses(400, response, 'Invalid code');
    }

    const updateUser = await UserModel.updateOne(
      {_id: code},
      {
        verify_email: true,
      }
    );

    // successful
    return httpResponses(200, response, 'Verify email done!');
  } catch (error) {
    return httpResponses(500, response, error.message || error);
  }
}

// login
export async function loginController(request, response) {
  try {
    const {email, password} = request.body;

    if (!email || !password) {
      return httpResponses(400, response, 'provide email, password');
    }

    const user = await UserModel.findOne({email});
    if (!user) {
      return httpResponses(
        400,
        response,
        'Địa chỉ email không khớp, vui lòng kiểm tra lại'
      );
    }

    if (user.status !== 'Active') {
      return httpResponses(400, response, 'Vui lòng liên hệ với quản trị viên');
    }

    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return httpResponses(
        400,
        response,
        'Mật khẩu không khớp, vui lòng kiểm tra lại'
      );
    }
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    // update last login date
    await UserModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
    });

    response.cookie('accessToken', accessToken, cookieOptions);
    response.cookie('refreshToken', refreshToken, cookieOptions);

    return httpResponses(200, response, 'Đăng nhập thành công !', {
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return httpResponses(500, response, error.message || error);
  }
}

// get login user details
export async function userDetailsController(request, response) {
  try {
    const userId = request.userId;
    const user = await UserModel.findById(userId).select(
      '-password -refresh_token'
    );
    return httpResponses(200, response, 'user details', user);
  } catch (error) {
    return httpResponses(500, response, error.message || error);
  }
}

// logout
export async function logoutController(request, response) {
  try {
    const userId = request.userId; //middleware

    response.clearCookie('accessToken', cookieOptions);
    response.clearCookie('refreshToken', cookieOptions);

    //remove refresh token
    await UserModel.findByIdAndUpdate(userId, {
      refresh_token: '',
    });

    return httpResponses(200, response, 'Đăng xuất thành công !');
  } catch (error) {
    return httpResponses(500, response, error.message || error);
  }
}

// upload avatar
export async function uploadAvatarController(request, response) {
  try {
    const userId = request.userId; // auth middleware
    const image = request.file; // multer middleware
    const upload = await uploadImageCloudiary(image);

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return httpResponses(200, response, 'Tải ảnh lên thành công !', {
      _id: userId,
      avatar: upload.secure_url,
    });
  } catch (error) {
    return httpResponses(500, response, error.message || error);
  }
}

// update user details
export async function updateUserDetailsController(request, response) {
  try {
    const userId = request.userId;
    const {name, email, mobile, password} = request.body;

    let hashPassword = '';

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }

    const updateUser = await UserModel.updateOne(
      {_id: userId},
      {
        ...(name && {name}),
        ...(email && {email}),
        ...(mobile && {mobile}),
        ...(password && {password: hashPassword}),
      }
    );

    return httpResponses(
      200,
      response,
      'Cập nhật hồ sơ thành công !',
      updateUser
    );
  } catch (error) {
    return httpResponses(500, response, error.message || error);
  }
}

// forgot password
export async function forgotPasswordController(request, response) {
  try {
    const {email} = request.body;

    const user = await UserModel.findOne({email});
    if (!user) {
      return httpResponses(400, response, 'Địa chỉ email chưa được đăng ký');
    }

    const otp = generatedOtp();

    // Add one hour to the current time
    const now = new Date();
    const expireTime = new Date(now.getTime() + 60 * 60 * 1000);

    await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: expireTime,
    });

    await sendEmail({
      sendTo: email,
      subject: 'Forgot password from FoodOrder',
      html: forgotPasswordTemplate(user.name, otp),
    });

    return httpResponses(200, response, 'Vui lòng kiểm tra email của bạn !');
  } catch (error) {
    return httpResponses(500, response, error.message || error);
  }
}

// verify forgot password
export async function verifyForgotPasswordOTP(request, response) {
  try {
    const {email, otp} = request.body;

    if (!email || !otp) {
      return httpResponses(400, response, 'Provide required field email, otp');
    }

    const user = await UserModel.findOne({email});
    if (!user) {
      return httpResponses(400, response, 'Email is not available');
    }

    if (user.forgot_password_expiry < new Date()) {
      return httpResponses(
        400,
        response,
        'Mã OTP hết hạn, vui lòng kiểm tra lại'
      );
    }

    if (otp !== user.forgot_password_otp) {
      return httpResponses(
        400,
        response,
        'Mã OTP không đúng, vui lòng thử lại'
      );
    }

    // await sendEmail({
    //   sendTo: email,
    //   subject: 'Forgot password from FoodOrder',
    //   html: forgotPasswordTemplate(user.name, otp),
    // });

    // if otp is not expired,  otp === user.forgot_password_otp

    await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: '',
      forgot_password_expiry: '',
    });

    return httpResponses(200, response, 'Xác nhận thành công !');
  } catch (error) {
    return httpResponses(500, response, error.message || error);
  }
}

// reset the password
export async function resetPassword(request, response) {
  try {
    const {email, newPassword, confirmPassword} = request.body;

    if (!email || !newPassword || !confirmPassword) {
      return httpResponses(
        400,
        response,
        'Provide required field email, newPassword, confirmPassword'
      );
    }

    const user = await UserModel.findOne({email});
    if (!user) {
      return httpResponses(400, response, 'Email is not available');
    }

    if (newPassword !== confirmPassword) {
      return httpResponses(
        400,
        response,
        'newPassword and confirmPassword not same'
      );
    }

    const checkPassword = await bcryptjs.compare(newPassword, user.password);
    if (checkPassword) {
      return httpResponses(
        400,
        response,
        'Mật khẩu mới không được trùng với mật khẩu hiện tại'
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword,
    });

    return httpResponses(200, response, 'Password updated Successfully!');
  } catch (error) {
    return httpResponses(500, response, error.message || error);
  }
}

// refresh token
export async function refreshToken(request, response) {
  try {
    const refreshToken =
      request.cookies.refreshToken ||
      request?.headers?.authorization?.split(' ')[1];

    if (!refreshToken) {
      return httpResponses(
        401,
        response,
        'Token không hợp lệ, vui lòng thử lại sausau'
      );
    }

    const verifyToken = jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );
    if (!verifyToken) {
      return httpResponses(
        401,
        response,
        'Token hết hạn, vui lòng đăng nhập để tiếp tục'
      );
    }

    const newAccessToken = await generatedAccessToken(verifyToken.id);

    response.cookie('accessToken', newAccessToken, cookieOptions);

    return httpResponses(200, response, 'new access token generated', {
      accessToken: newAccessToken,
    });
  } catch (error) {
    return httpResponses(500, response, error.message || error);
  }
}

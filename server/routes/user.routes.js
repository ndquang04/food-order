import {Router} from 'express';
import {
  forgotPasswordController,
  loginController,
  logoutController,
  refreshToken,
  registerUserController,
  resetPassword,
  updateUserDetailsController,
  uploadAvatarController,
  userDetailsController,
  verifyEmailController,
  verifyForgotPasswordOTP,
} from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginController);
userRouter.get('/user-details', auth, userDetailsController);
userRouter.get('/logout', auth, logoutController);
userRouter.put(
  '/upload-avatar',
  auth,
  upload.single('avatar'),
  uploadAvatarController
);
userRouter.put('/update-user', auth, updateUserDetailsController);
userRouter.put('/forgot-password', forgotPasswordController);
userRouter.put('/verify-forgot-password-otp', verifyForgotPasswordOTP);
userRouter.put('/reset-password', resetPassword);
userRouter.post('/refresh-token', refreshToken);

export default userRouter;

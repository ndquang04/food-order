const verifyEmailTemplate = (name, url) => {
  return `
    <p>Dear ${name}</p>
    <p>Thank you for resgister Food Order.</p>
    <a href=${url} style="color:black;background:orange;margin-top:10px;padding:10px;display:block">
      Verify Email
    </a>
  `;
};

const forgotPasswordTemplate = (name, otp) => {
  return `
    <div>
      <p>Dear ${name}</p>
      <p>You're requested a password reset. Please use following OTP code to reset your password.</p>
      <div>
        <p style="background:yellow;font-size:20px;padding:10px;font-weight:600">${otp}</p>
      </div>
      <p>This OTP is valid for 1hour only. Enter this OTP in the FoodOrder website to proceed withDirectives
      resetting your password.</p>
      <p>Thanks</p>
      <p>Food Order</p>
    </div>
  `;
};

export {verifyEmailTemplate, forgotPasswordTemplate};

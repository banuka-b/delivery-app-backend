// templates/otpTemplate.js
const getOtpTemplate = (otp) => `
  <div style="font-family: sans-serif;">
    <h2>Your OTP Code</h2>
    <p>Use the following code to verify your identity:</p>
    <h3>${otp}</h3>
    <p>This code will expire in 5 minutes.</p>
  </div>
`;
module.exports = getOtpTemplate;

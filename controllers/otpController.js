// controllers/otpController.js
const sendEmail = require('../utils/sendEmail');
const generateOtp = require('../utils/gene')
const getOtpTemplate = require('../templates/otpTemplate');
const OtpModel = require('../model/Otp')


const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  const html = getOtpTemplate(otp);
 const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
     
      const otpRecord = new OtpModel({ email, otp, expiresAt });
      await otpRecord.save();


    await sendEmail(email, 'Your OTP Code', html);
    
    res.status(200).json({ message: 'OTP sent', otp }); 
  } catch (err) {
    console.error('OTP email error:', err);
    res.status(500).send('Failed to send OTP');
  }
};
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const otpRecord = await OtpModel.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Optional: Delete the OTP after successful verification
    await OtpModel.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).send('Server error during OTP verification');
  }
};

module.exports = { sendOtp, verifyOtp };


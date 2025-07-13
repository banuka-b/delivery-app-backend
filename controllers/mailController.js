const sendEmail = require('../utils/sendEmail');
const getWelcomeTemplate = require('../templates/welcomeTemplate');


const sendWelcome = async (req, res) => {
 const { email, name } = req.body;
 const subject = 'Welcome to DevCraft';
 const html = getWelcomeTemplate(name);


  try {
    await sendEmail(email, subject, html);
    res.status(200).send('Welcome email sent');
  } catch (err) {
    console.error('Error sending welcome email:', err);
    res.status(500).send('Email failed');
  }
  
};


module.exports = { sendWelcome };

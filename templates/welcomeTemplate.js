const getWelcomeTemplate = (name) => `
  <div style="font-family: sans-serif; line-height: 1.6;">
    <h2>Welcome aboard, ${name}!</h2>
    <p>We're thrilled to have you in our developer circle.</p>
    <p>Feel free to explore, build, and ask questions. You've got this</p>
  </div>
`;

module.exports = getWelcomeTemplate;

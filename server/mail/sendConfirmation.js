const mjmlUtils = require('mjml-utils');

const transporter = require("../config/nodemailer");
const path = require("path");
const pathToHtmlEmailTemplate = path.join(
  __dirname,
  "./templates/confirmBooking.html"
);

const sendConfirmationMail = (to, variables, from = "airByP@gmail.com") => {
  return mjmlUtils
    .inject(pathToHtmlEmailTemplate, variables)
    .then(finalTemplate => {
      console.log("FINAL TEMPLATE");
      console.log(finalTemplate);

      return transporter
        .sendMail({
          from: `"airByP" <${from}>`,
          to,
          subject: `Confirmación de reserva ${variables.bookingId}` , // Asunto
          html: finalTemplate
        })
        .then(info => console.log(info));
    });
};
module.exports = sendConfirmationMail;

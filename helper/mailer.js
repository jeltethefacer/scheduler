var nodemailer = require('nodemailer');
const config = require("../utils/config")
const logger = require("../utils/logger")

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'j.w.r.boelens@gmail.com',
    pass: config.EMAIL_PASSWORD
  }
});

var mailOptions = {
  from: 'j.w.r.boelens@gmail.com',
  to: 'rpp23173@zzrgg.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


function sendMailEmailPassword(email, password, frontName, lastName) {
    logger.info(email, password, frontName, lastName)
    var mailOptions = {
        from: 'j.w.r.boelens@gmail.com',
        to: email,
        subject: 'You password for Scheduler app!!',
        text: `Hello ${frontName} ${lastName}, your password is ${password}`
      };


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });    
}

module.exports = sendMailEmailPassword
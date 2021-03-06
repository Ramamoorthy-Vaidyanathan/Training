const Bull = require('bull');
const nodemailer = require("nodemailer");

const emailQueue = new Bull('my-email-queue')

emailQueue.process(async (job) => {
    // console.log(job.data)
    let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: job.data.email, // sender address
    to: `${job.data.allMails.join(',')}`, // list of receivers
    subject: "Hurrey!!!! New Movie added", // Subject line
    html: `<div>
    <img src=${job.data.detail.image_url} alt=${job.data.detail.name} />
    <h3>${job.data.detail.name}</h3>
    <p>${job.data.detail.gener}</p>
    <div>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})

const sendEmail = (data) => {
    emailQueue.add(data)
}

module.exports = { sendEmail, emailQueue }
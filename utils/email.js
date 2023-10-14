const nodemailer = require('nodemailer');


//create function 

const sendEmail =async(options)=>{
    //1)create tarnsport
  /*   var transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    }); */
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
          user: "316454166fa81f",
          pass: "abb141f704621f"
        }
      });
    //2)Define the options
    const mailOptions ={
        from :options.from  ,
        to: options.to ,
        sunject: options.sunject ,
        text: options.message
    }
    //3)send the email
    await transport.sendMail(mailOptions)
}

module.exports =sendEmail;
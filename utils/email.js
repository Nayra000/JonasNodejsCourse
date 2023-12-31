const nodemailer = require('nodemailer');
const pug =require('pug');
const {htmlToText} = require('html-to-text');

module.exports =class Email{
  constructor(user , url){
    this.to =user.email ;
    this.firstName =user.name.split(' ')[0];
    this.url = url;
    this.from =`Nayra <${process.env.EMAIL_FROM}>`;
  }
  newTransport(){
    if(process.env.NODE_ENV ==='production'){
      return nodemailer.createTransport({
        service: 'Brevo',
       /*  host: process.env.BREVO_HOST,
        port: process.env.BREVO_PORT, */
        auth: {
          user: process.env.BREVO_USERNAME,
          pass: process.env.BREVO_PASSWORD
        }
      });
    }
    return nodemailer.createTransport({
      host:  process.env.MAIL_HOST,
      port:  process.env.MAIL_PORT,
      auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
      }
    });
  }

  async send(template ,subject){
    const html =pug.renderFile(`${__dirname}/../views/email/${template}.pug` ,{
      firstName :this.firstName ,
      subject,
      url :this.url
    })

    const mailOptions = {
      from :this.from,
      to:this.to ,
      subject ,
      html ,
      text: htmlToText(html)
    }
    await this.newTransport().sendMail(mailOptions);
    
  }
  async sendWelcome() {
    await this.send('welcome' ,'Welcome to the natours');
  }
  async resetPassword (){
    await this.send('resetPassword' ,'Reset your password')
  }


}








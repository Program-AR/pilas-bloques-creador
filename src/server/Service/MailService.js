const nodeMailer = require('nodemailer');
const config = require('../config');

class MailerService{
    sendResetPassEmail(user) { 
      let transporter = this.createTransporter();
      let mailOptions = this.mailOptions(user); 
      return transporter.sendMail(mailOptions);
  
    }


    createTransporter() {
        return nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: config.supportMail,
                pass: config.supportMailPassword
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    mailOptions(user) {
        return {
            from: '"Equipo de Soporte Pilas Bloques" <Soporte.PilasBloques@gmail.com>',
            to: user.email,
            subject: 'Recuperacion de contraseña',
            text: 'Se ha solicitado un cambio de contraseña. Accede al siguiente link para continuar: http://localhost:9001/changePassword?token=' + user.tokenHiperFalopa100PorCientoSeguro
        };
    }
}
module.exports = new MailerService();
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    constructor() {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.mail.ovh.net',
        port: 587,
        secure: false,
        auth: {
          user: 'iomedical@ioit.tn',
          pass: 'iomedical',
        },
      });
    }
  
    async sendEmail(email: string, newPassword: string): Promise<void> {
      const mailOptions: nodemailer.SendMailOptions = {
        from: 'iomedical@ioit.tn',
        to: email,
        subject: 'Réinitialisation du mot de passe',
        text: `BONJOUR! 
  
        
        Voici le code que vous avez demandé pour réinitialiser votre mot de passe: ${newPassword}`,
      };
  
      try {
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
}

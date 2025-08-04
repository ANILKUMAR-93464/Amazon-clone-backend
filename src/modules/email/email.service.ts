// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as config from 'config';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class EmailService {
  private readonly emailConfig = config.get('email');
  private readonly appName = this.emailConfig.FROM_NAME || 'Amazon Clone';
  private readonly supportEmail =
    this.emailConfig.EMAIL_USER || 'anil.craftnotion@gmail.com';

    
  private transporter = nodemailer.createTransport({
    service: this.emailConfig.SERVICE,
    host: this.emailConfig.HOST,
    port: this.emailConfig.PORT,
    secure: this.emailConfig.SECURE,
    auth: {
      user: this.emailConfig.EMAIL_USER,
      pass: this.emailConfig.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: this.emailConfig.TLS_REJECT_UNAUTHORIZED,
    },
  });


  async sendVerificationEmail(user: User): Promise<void> {
    const verificationUrl = `${this.emailConfig.BASE_URL}/users/verify-email?token=${user.emailVerificationToken}`;

    const emailText = `
${this.appName} - Email Verification
------------------------------------------------

Hello ${user.name},

Thank you for registering with ${this.appName}! 

Please verify your email address by clicking the link below:
${verificationUrl}

This verification link will expire in 24 hours.

If you didn't request this account, please ignore this email.

------------------------------------------------
© ${new Date().getFullYear()} ${this.appName}
Support: ${this.supportEmail}
`;

  
console.log(emailText)
    const mailOptions = {
      from: `"${this.appName}" <${this.emailConfig.EMAIL_USER}>`,
      to: user.email,
      subject: `Verify Your ${this.appName} Account`,
      text: emailText,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

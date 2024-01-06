import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';
declare const getSmtpTransport: () => nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
export { getSmtpTransport };

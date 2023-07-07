import nodemailer from 'nodemailer';
import { getEnvVariable } from './helpers';

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: getEnvVariable("SMTP_EMAIL"),
        pass: getEnvVariable("SMTP_PASSWORD"),
    },
    secure: true,
})

export async function sendResetPasswordEmail(to: string, url: string) {
    return await transporter.sendMail({
        from: getEnvVariable("SMTP_EMAIL"),
        to,
        subject: `Reset Password for ShrinkIt`,
        html: `<div>password reset link - <a href="http://${url}">${url}</a></div>`
    });
}
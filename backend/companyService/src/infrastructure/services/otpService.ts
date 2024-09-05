import nodemailer from 'nodemailer';
import { generateOtp } from '../../utils'
require('dotenv').config()


export class otpService {

    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    }
    generateOtp(length: number = 4) : string {
        return generateOtp(length)
    }

    async sendMail(
        email:string,
        subject:string,
        message: string
    ) : Promise<void> {
        const mailOptions = {
            from : process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message,
            
        }

        console.log(mailOptions,"msgmsgmsgmsg")

        await this.transporter.sendMail(mailOptions)
    }

}
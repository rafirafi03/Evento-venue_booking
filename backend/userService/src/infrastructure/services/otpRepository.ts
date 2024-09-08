import nodemailer from 'nodemailer';
import { generateOtp } from '../../utils'
import dotenv from 'dotenv';

dotenv.config()


export class otpService {

    private _transporter: nodemailer.Transporter;
    constructor() {
        this._transporter = nodemailer.createTransport({
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

        try {
            
            const mailOptions = {
                from : process.env.EMAIL_USER,
                to: email,
                subject: subject,
                text: message,
                
            }
    
            console.log(mailOptions,"msgmsgmsgmsg")
    
            await this._transporter.sendMail(mailOptions)
        } catch (error) {
            console.log(error)
            throw new Error("error" + error)
        }
    }

}
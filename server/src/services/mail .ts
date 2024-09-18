import nodemailer from 'nodemailer';


export const mailService = async(email:string,otp:string) =>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.USER_EMAIL, // your Gmail address
            pass: process.env.EMAIL_PASSWORD, // your Gmail password
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Email Validation',
        text: `Your OTP code is: ${otp}`,
    };

    try{
        await transporter.sendMail(mailOptions);
    }catch(err){
        console.error(err);
    }
}
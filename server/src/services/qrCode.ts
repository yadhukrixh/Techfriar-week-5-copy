import QRCode from 'qrcode';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});




export const generateQR = async(
    userName:string,
    movieName:string,
    theaterName:string,
    date:string,
    showTime:string,
    seats:string[]
)=>{
    const qrData = `
        User_name : ${userName},
        Movie_name : ${movieName},
        Theater_name : ${theaterName},
        Date : ${date.split('T')},
        Time : ${showTime},
        Seats : ${seats.join(',')}`
    

    const qrText = JSON.stringify(qrData);
    try{
        const qrCodeUrl = await QRCode.toDataURL(qrText);
        const uploadResponse = await cloudinary.uploader.upload(qrCodeUrl, {
            folder: process.env.CLOUDINARY_FOLDER,
            public_id: `booking-${Date.now()}`, // Use a unique ID or timestamp
            resource_type: 'image',
        });

        return uploadResponse.secure_url;
    }catch(error){
        console.error(error)
    }
}
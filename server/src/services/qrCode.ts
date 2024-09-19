import QRCode from 'qrcode';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Generates a QR code for a movie booking and uploads it to Cloudinary.
 * 
 * @param {string} userName - The name of the user who made the booking.
 * @param {string} movieName - The name of the movie.
 * @param {string} theaterName - The name of the theater.
 * @param {string} date - The date of the booking in ISO format.
 * @param {string} showTime - The time of the show.
 * @param {string[]} seats - An array of seat numbers.
 * @returns {Promise<string>} The secure URL of the uploaded QR code.
 */
export const generateQR = async (
    userName: string,
    movieName: string,
    theaterName: string,
    date: string,
    showTime: string,
    seats: string[]
) => {
    // Create a string containing the booking details
    const qrData = `
        User_name : ${userName},
        Movie_name : ${movieName},
        Theater_name : ${theaterName},
        Date : ${date.split('T')},
        Time : ${showTime},
        Seats : ${seats.join(',')}
    `

    // Convert the booking details to a JSON string
    const qrText = JSON.stringify(qrData);

    try {
        // Generate a QR code from the booking details
        const qrCodeUrl = await QRCode.toDataURL(qrText);

        // Upload the QR code to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(qrCodeUrl, {
            folder: process.env.CLOUDINARY_FOLDER,
            public_id: `booking-${Date.now()}`, // Use a unique ID or timestamp
            resource_type: 'image',
        });

        // Return the secure URL of the uploaded QR code
        return uploadResponse.secure_url;
    } catch (error) {
        // Log any errors that occur during the process
        console.error(error)
    }
}
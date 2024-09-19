import twilio from 'twilio';

// Twilio account credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Initialize Twilio client with account credentials
const client = twilio(accountSid, authToken);

// Twilio phone number
const from = process.env.TWILIO_PHONE_NUMBER;

/**
 * Sends a WhatsApp message using Twilio.
 * 
 * @param {string} phoneNumber - The recipient's phone number.
 * @param {string} messageBody - The message body.
 * @param {any} mediaUrl - The URL of the media to be sent.
 * @returns {Promise} A promise that resolves with the sent message.
 */
export const whatsappService = async (phoneNumber: string, messageBody: string, mediaUrl: any) => {
    try {
        // Create a new message using the Twilio client
        const message = await client.messages.create({
            // Use your Twilio WhatsApp number as the sender
            from: 'whatsapp:+14155238886',
            // Format the recipient's phone number for WhatsApp
            to: `whatsapp:+91${phoneNumber}`,
            // Set the message body
            body: messageBody,
            // Include the media URL
            mediaUrl: [mediaUrl],
        });
        // Return the sent message
        return message;
    } catch (error) {
        // Throw an error if message sending fails
        throw new Error(`Failed to send WhatsApp message: ${error}`);
    }
}
import Razorpay from 'razorpay'; // Import Razorpay
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string, // Use 'as string' to ensure these are not undefined
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// Define the response type from Razorpay's order creation (as per @types/razorpay)
interface RazorpayOrder {
  id: string;
  entity: string;
  amount: string | number; // Updated to handle both string and number
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
}

const createRazorpayOrder = async (amount: any): Promise<RazorpayOrder> => {
  try {
    const options = {
      amount: amount * 100, // Convert amount to paise
      currency: 'INR',
      receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`, // Use template literal
    };

    const order = await razorpay.orders.create(options);

    // Ensure 'amount' is treated as a number if it's a string
    if (typeof order.amount === 'string') {
      order.amount = parseFloat(order.amount);
    }

    return order as RazorpayOrder;
  } catch (error: any) {
    throw new Error(`Failed to create Razorpay order: ${error.message}`);
  }
};

export default createRazorpayOrder;

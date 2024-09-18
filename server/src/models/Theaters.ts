import mongoose, { Document, Schema } from "mongoose";

export interface ITheaters extends Document {
    theater_name: string;
    address: string;
    city: string;
    postcode: number;
    lat: number;
    lng: number;
    seats:number;
}

const TheaterSchema: Schema = new Schema({
  theater_name: { type: String, required: true, default:null},
  address: { type: String, required: true, default:null },
  city: { type:String ,required:true,default:null},
  postcode: { type: Number, required: true, default:null },
  lat: { type: Number, required: true, default:null },
  lng: { type: Number, required: true, default:null },
  seats: { type: Number, required: true, default:null },
});

// Create and export the model
export default mongoose.model<ITheaters>("Theater", TheaterSchema);
 
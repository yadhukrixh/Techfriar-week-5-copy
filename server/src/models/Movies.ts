import mongoose, { Document, Schema } from "mongoose";

export interface IMovie extends Document {
  id?:any;
  title: string;
  year: string;
  language:string;
  released: Date;
  runtime: string;
  genre: string[];
  actors: string[];
  plot: string;
  posterUrl: string;
  imdbID:string;
}

const MovieSchema: Schema = new Schema({
  // _id:{type: mongoose.Schema.Types.ObjectId, required:false},
  title: { type: String, required: true, default:null},
  year: { type: String, required: true, default:null },
  language: { type:String ,required:true,default:null},
  releaseDate: { type: Date, required: true, default:null },
  runtime: { type: String, required: true, default:null },
  genre: { type: [String], required: true, default:null },
  actors: { type: [String], required: true, default:null },
  plot: { type: String, required: true, default:null },
  rating:{type:Number, required: true, default:null},
  posterUrl: { type: String, required: true, default:null },
  imdbID: { type: String, required: true, default:null },
});

// Create and export the model
export default mongoose.model<IMovie>("Movies", MovieSchema);
 
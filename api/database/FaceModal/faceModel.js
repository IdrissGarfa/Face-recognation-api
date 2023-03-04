import mongoose from "mongoose";

const faceSchema = new mongoose.Schema({
  name: {
    type: String
  },
  CIN: {
    type: String
  }, 
  tel: {
    type: String
  },
  label: {
    type: String,
    required: true,
    unique: true,
  }, 
  descriptions: {
    type: Array,
    required: true,
  },
});

const FaceModel = mongoose.model("Face", faceSchema);

export default FaceModel;
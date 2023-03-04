import faceapi from "face-api.js";
import { Canvas, Image } from "canvas";
import canvas from "canvas";
import fileUpload from "express-fileupload";

import FaceModel from "../database/FaceModal/faceModel.js";

export async function uploadLabeledImages(image, label) {
    try {
  
      const descriptions = [];
      // Loop through the images
        const img = await canvas.loadImage(image);
        // Read each face and save the face descriptions in the descriptions array
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor);

      const createFace = await FaceModel.create({
        label: label,
        descriptions: descriptions
      })
      
      return true;
    } catch (error) {
      console.log(error);
      return (error);
    }
  }


export const postFace = async (req, res) => {

    const { img, label } = req.body;

    const result = await uploadLabeledImages(img , label);

    if (result){
        res.json({ message: "Face data stored successfully "});
    }else{
        res.json({ message: "Something went wrong, please try again"});
    }
}


  
import faceapi from "face-api.js";
import { Canvas, Image } from "canvas";
import canvas from "canvas";
import fileUpload from "express-fileupload";

import FaceModel from "../database/FaceModal/faceModal.js";

async function uploadLabeledImages(images, label) {
    try {
  
      const descriptions = [];
      // Loop through the images
      for (let i = 0; i < images.length; i++) {
        const img = await canvas.loadImage(images[i]);
        // Read each face and save the face descriptions in the descriptions array
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }

      console.log(descriptions)
  
      // Create a new face document with the given label and save it in DB
    //   const createFace = new FaceModel({
    //     label: label,
    //     descriptions: descriptions,
    //   });
    //   await createFace.save();

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


const postFace = async (req, res) => {
    const img = req.files.img.tempFilePath;
    const label = req.body.label;

    let result = await uploadLabeledImages([img], label);
    
    if (result){
        res.json({ message: "Face data stored successfully "});
    }else{
        res.json({ message: "Something went wrong, please try again"});
    }
}

export default postFace;

  
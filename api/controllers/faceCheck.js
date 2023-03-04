import faceapi from "face-api.js";
import { Canvas, Image } from "canvas";
import canvas from "canvas";
import fileUpload from "express-fileupload";

import FaceModel from "../database/FaceModal/faceModal.js";

async function getDescriptorsFromDB(image) {
    // Get all the face data from mongodb and loop through each of them to read the data
    let faces = await FaceModel.find();
    for (let i = 0; i < faces.length; i++) {
      // Change the face data descriptors from Objects to Float32Array type
      for (let j = 0; j < faces[i].descriptions.length; j++) {
        faces[i].descriptions[j] = new Float32Array(Object.values(faces[i].descriptions[j]));
      }
      // Turn the DB face docs to
      faces[i] = new faceapi.LabeledFaceDescriptors(faces[i].label, faces[i].descriptions);
    }
  
    // Load face matcher to find the matching face
    const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);
  
    // Read the image using canvas or other method
    const img = await canvas.loadImage(image);
    let temp = faceapi.createCanvasFromMedia(img);
    // Process the image for the model
    const displaySize = { width: img.width, height: img.height };
    faceapi.matchDimensions(temp, displaySize);
  
    // Find matching faces
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
    return results;
  }

 
const faceCheck = async (req, res) => {
    const img = req.files.img.tempFilePath;
    let result = await getDescriptorsFromDB(img);
    res.json({ result });
}

export default faceCheck;

  
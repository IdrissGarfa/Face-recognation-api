import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import faceapi from "face-api.js";
import { Canvas, Image } from "canvas";
import canvas from "canvas";
import fileUpload from "express-fileupload";
import startServer from "./server/start.js";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import faceRoutes from "./routes/faceRoutes.js";
import authRoutes from "./routes/authRoutes.js";


faceapi.env.monkeyPatch({ Canvas, Image });


dotenv.config();

const app = express();

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use(
    fileUpload({useTempFiles: true})
  );

  async function LoadModels() {
    // Load the models
    // __dirname gives the root directory of the server
    await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/database/models");
    await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/database/models");
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/database/models");
  
  }

  LoadModels();
  
app.use('/api/v1/face-recognation', faceRoutes);
// app.use('/api/v1/auth/clients', authRoutes);




startServer(app);
import express from "express";
const router = express.Router();

import postFace from "../controllers/postFace.js"
import faceCheck from "../controllers/faceCheck.js";

router.post('/post-face', postFace);
router.post('/face-check', faceCheck);

export default router;
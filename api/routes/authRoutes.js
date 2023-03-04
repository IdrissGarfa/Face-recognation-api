import express from "express";
const router = express.Router();

import authClient from "../controllers/authClient.js";


router.post('/', authClient);


export default router;
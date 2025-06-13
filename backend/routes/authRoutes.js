import express from 'express';
import {registerUser, loginUser, getUserProfile, profileUpload} from '../controllers/authController.js'
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

router.post("/upload-image", profileUpload);

export default router;
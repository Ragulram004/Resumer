import express from 'express'
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume
} from '../controllers/resumeController.js'

import protect from '../middlewares/authMiddleware.js'

//upload resume image yet to implement

const router = express.Router()

router.post("/", protect, createResume) // create resume
router.get("/", protect, getUserResumes) // get resume
router.get("/:id",protect, getResumeById) // get resume by id
router.put("/:id", protect, updateResume) // update resume
/* yet to implement
router.put("/:id/upload-image",protect,)
*/

router.delete("/:id",protect, deleteResume) // delete resume

export default router
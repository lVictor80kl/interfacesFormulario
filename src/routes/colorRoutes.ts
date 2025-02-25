import express from 'express'
import { getPallette,createPallette, updatePallette } from '../controllers/colorController';
import upload from "../libs/multerConfig"


const router = express.Router()

router.post('/update',  updatePallette)
router.post('/create', upload.fields([
    { name: "typo1File", maxCount: 1 },
    { name: "typo2File", maxCount: 1 },
  ]), createPallette)
router.post('/get', getPallette)

export default router;
import express from 'express'
import { getPallette,createPallette, updatePallette, deletePallette } from '../controllers/colorController';
import upload from "../libs/multerConfig"


const router = express.Router()

router.patch('/update/:id', upload.fields([
    { name: "typo1File", maxCount: 1 },
    { name: "typo2File", maxCount: 1 },
]),  updatePallette)
router.post('/create', upload.fields([
    { name: "typo1File", maxCount: 1 },
    { name: "typo2File", maxCount: 1 },
  ]), createPallette)
router.get('/get/:id', getPallette)
router.delete('/delete/:id', deletePallette)

export default router;
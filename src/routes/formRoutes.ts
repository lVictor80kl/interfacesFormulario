import express from 'express'
import { createForm, updateForm, getForm } from '../controllers/formController'
import { authenticateToken } from "../middlewares/auth";



const router = express.Router()

router.post('/createform',authenticateToken, createForm)
router.patch('/updateform/:id',authenticateToken, updateForm)
router.get('/getform/:id',authenticateToken, getForm)

export default router;
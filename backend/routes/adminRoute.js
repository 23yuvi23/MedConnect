

import express from 'express'
import { addDoctor ,loginAdmin } from "../controllers/adminController.js";



import upload from '../middleware/multer.js'

// create router instance 
const adminRouter = express.Router()

// post endpoint
adminRouter.post('/add-doctor',upload.single('image'),addDoctor)

adminRouter.post('/login',loginAdmin)



export default adminRouter
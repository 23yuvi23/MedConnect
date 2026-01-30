import express from 'express'
import { addDoctor ,loginAdmin } from "../controllers/adminController.js";
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js';

// create router instance 
const adminRouter = express.Router()

// post endpoint authadmin middleware added
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)

adminRouter.post('/login',loginAdmin)



export default adminRouter
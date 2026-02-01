import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'

// API for adding Doctor
const addDoctor = async (req, res) => {

    try {
        const { name, email, password, speciality, degree, about, fees, address, experience } = req.body
        // parse form data using middleware
        const imageFile = req.file
        // const image = 

        // console.log({ name,email, password, speciality, degree, about , fees, address },imageFile);

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format using validator package
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // encrypt password 
        // generate a salt to hash the password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image file in cloudinary so we get 1 image url can use in database 
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        // data format for databse
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        // save in database 
        await newDoctor.save()

        res.json({ success: true, message: "Doctor Added Successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

// API for admin login 
const loginAdmin = async (req, res) => {
    try {

        // match email and pass from env if match then jsonwebtoken
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            // generate webtoken
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Api to get All Doctors List For Admin Panel  /all-doctors
const allDoctors = async(req, res) => { 
    try {
        //select('-password') for removing password not to  display in frontend
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { addDoctor, loginAdmin, allDoctors }
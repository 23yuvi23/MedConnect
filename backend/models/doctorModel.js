// create doc model using mongoose 

import mongoose from "mongoose";

// doctors schema

const doctorSchema = new mongoose.Schema({
    // define schema property for Doc data with the type 
    name: {type:String, required:true},
    email: {type:email, required:true, unique:true},
    password: {type:String, required:true},
    image: {type:String, required:true},
    speciality: {type:String, required:true},
    degree: {type:String, required:true},
    experience: {type:String, required:true},
    about: {type:String, required:true},
    available: {type:Boolean, required:true},
    fees: {type:Number, required:true},
    address: {type:Object, required:true},
    date: {type:number, required:true},
    slots_booked: {type:Object, default:{}},

},{minimize:false})  // to use empty object we have to use minimize like this 

// using schema we will create Doc model now 
const doctorModel = mongoose.models.doctor || mongoose.model('doctor',doctorSchema)

export default doctorModel
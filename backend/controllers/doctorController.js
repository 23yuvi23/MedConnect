//  multiple controller function for multiple API's

import doctorModel from "../models/doctorModel.js";

// Tick in All-Doctors so untick that will make that DOC unAvailable for booking from database 
const changeAvailability = async (req,res)=>{
    try {
        
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)

        // change docdataAvailable
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({success:true, message:'Availablity Changed'})
        

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export {changeAvailability}
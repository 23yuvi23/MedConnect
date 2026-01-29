// creating multer middleware 

import multer from "multer";

// config for disk storage
const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

// instance of multer using this disk storage 
const upload = multer({storage})

export default upload
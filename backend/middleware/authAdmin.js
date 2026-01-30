import jwt from 'jsonwebtoken'

// admin authentication middleware
const authAdmin = async (req,res,next)=>{
    try {
        
        const {atoken} = req.headers
        if(!atoken){
            return res.json({success:false,message:"Not Authorized Login again"})
        }
        // decode token if available
        const token_decode = jwt.verify(atoken,process.nextTick.JWT_SECRET)

        // check if it is same as email+password
        if (token_decode!== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }

        next()

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export default authAdmin
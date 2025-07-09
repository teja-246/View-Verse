import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        console.log("Verifying JWT..."); // Debug log
               
        console.log("Cookies received:", req.cookies); // Debug cookies
        console.log("Headers:", req.headers); // Debug headers
        
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            throw new ApiError(401, "Unauthorized Request in VerifyJWT")
        }

        console.log("Token found:", token); // Debug token

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        console.log("Decoded token:", decodedToken); // Debug decoded token
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } 
    catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})
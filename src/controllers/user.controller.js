import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async(req, res) =>{
    //user details
    // validations - not empty
    // pre existing user (check by username and email)
    // files exist => cloudinary
    //create user object - - create entry in db
    //remove and refresh token from response
    // check for user creation
    // return res


    const {fullName, email, username, password} = req.body
    console.log("email:", email);
    


})


export { registerUser }
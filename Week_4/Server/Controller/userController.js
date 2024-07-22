import { asyncHandler } from "../Utils/async";
import { User } from "../Models/UserSchema";
import { ApiError } from "../Utils/ApiError";



const createUser = asyncHandler(async(req, res)=>{
/*
  - Check all field should be filled  (Not Empty:)
  - Not exist already:{email, username},
  - check the password
        * Password Complexity
            1-Length: Minimum length of 8-12 characters.
            2-Character Variety
            3-No Common Passwords

*/

    const {username , email , password} = req.body;
    console.log(req.body);

    if([username, email, password].some((fields)=>fields?.trim() == "")){
      
       throw new ApiError('400', "All fields are required!")
    }
    
   const userExist = await User.findOne({$or:[{username}, {email}]})
    if(userExist){
         if(userExist.username){
        throw new ApiError('401', "This User is already taken")
       }else{
        throw new ApiError('400', "Email is already taken")
       }
    }
   


})




export {createUser}
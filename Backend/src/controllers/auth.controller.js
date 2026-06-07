import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { verifyGoogleToken } from "../services/auth.service.js";

export const googleLogin = async (req,res) => {
    try{
        const {token} = req.body;

        if(!token){
            return res.status(400).json({
                success:false,
                message: "Token missing",
            });
        }

        const payload = await verifyGoogleToken(token);

        const {sub,email,name,picture}=payload;

        let user = await User.findOne({googleId: sub});

        if(!user){
            user = await User.create({
                googleId: sub,
                email,
                name,
                profilePicture:picture,
            });
        }

        const jwtToken = generateToken(user._id);

        return res.status(200).json({
            success: true,
            token: jwtToken,
            user,
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


/*
CONTROLLER FLOW

Google Token
      ↓
Verify
      ↓
User Exists?
      ↓
No → Create User
Yes → Fetch User
      ↓
Generate JWT
      ↓
Send Response

*/

export const getCurrentUser = async (req,res) => {
    return res.status(200).json({
        success:true,
        user: req.user,
    });
};
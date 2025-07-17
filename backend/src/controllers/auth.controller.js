import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"
export const signup=async(req,res)=>{
    try{
        const {fullName,email,password}=req.body;
        if(!fullName || !email || !password)
        {
            return res.status(400).json({message:"All Fields are required"})
        }
        if (password.length<6){
            return res.status(400).json({message:"password must be at least 6 characters"})
        }
        
        const user=await User.findOne({email})
        if(user)
        {
            return res.status(400).json({message:"Email already exist"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=new User({
            fullName:fullName,
            email:email,
            password:hashedPassword
        })
        console.log(newUser)
        if(newUser)
        {
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })
            
        }
        else{
            res.status(400).json({
                message:"Invalid user data"
            })
        }

    }
    catch(error)
    {
      console.log("Error in signup controller",error.message);
      res.status(500).json({message:"Internal Server Error"})
    }
}






export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token=generateToken(user._id, res); // Set cookie
        console.log("i am consoling token in login controller",token)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error("Login error", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};





export async function logout(req, res) {
    try{
        res.clearCookie("jwt");
        res.status(200).json({ success: true, message: "LOGOUT SUCCESSFULLY" });
    }
    catch(error)
    {
        res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" });
    }
}


export const updateProfile=async(req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId= req.user._id;
        if(!profilePic)
        {
            return res.status(401).json({message:"profile pic is required"})
        }
        const uploadeResponse=await cloudinary.uploader.upload(profilePic);
        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadeResponse.secure_url},{new:true})
        return res.status(200).json(updatedUser)
        
    } catch (error) {
        console.log("error in update profile controller",error)
        res.status(500).json({message:"Internal Server Error"})
        
    }

}

export async function authCheck(req, res) {
    console.log("i am auth check")
    try {
        res.status(200).json( req.user  );
        console.log("currently loged in user is",req.user)
    } catch (error) {
        console.error("Error in auth check controller:", error);
        res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR" });
    }

}
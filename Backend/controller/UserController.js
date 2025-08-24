import User from "../model/UserModel";
import bcryptjs from "bcryptjs";
// =========================== register user ===========================
export const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
           return res.status(400).json({
            success:false,
            message:"Please provide all required fields"
           });
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists with this email"
            });
        }
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);
        const newUser=new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:newUser
        });    
    } catch (error) {
        console.error("Error registering user:",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        });
    }
};

// =========================================== login user ==================================
export const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all required fields"
            });
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            });
        }
        const isMatch=await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            });
        }
        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user
        });
    }catch(error){
        console.error("Error logging in user:",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        });
    }
}
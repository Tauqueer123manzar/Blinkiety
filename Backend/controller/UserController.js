import User from "../model/UserModel";

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
        const newUser=new User({
            name,
            email,
            password
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


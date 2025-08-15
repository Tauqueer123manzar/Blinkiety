import mongoose from "mongoose";

const addressSchema=new mongoose.Schema({
    address_line:{
        type:String,
        required:[true,"Address line is required"],
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    pincode:{
        type:String, 
        required:[true,"Pincode is required"],   
    },
    country:{
        type:String
    },
    mobile:{
        type:Number,
        default:null
    },
    status:{
        type:Boolean,
        default:true
    },
},{timestamps:true});

const AddressModel=mongoose.model("address", addressSchema);

export default AddressModel;
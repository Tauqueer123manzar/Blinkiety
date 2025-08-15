import mongoose, { mongo } from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:Array,
        default:[]
    },
    category:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"category"
        }
    ],
    subCategory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"subCategory"
        }
    ],
    unit:{
        type:String,
        default:""
    },
    stock:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        default:null
    },
    discount:{
        type:Number,
        default:0
    },
    description:{
        type:String,
        default:""
    },
    more_details:[
        {
            type:Object,
            default:{}
        }
    ],
    publish:{
        type:Boolean,
        default:true
    },
    rating:{
    }
},{timestamps:true});

const ProductModel=mongoose.model("product",productSchema);

export default ProductModel;

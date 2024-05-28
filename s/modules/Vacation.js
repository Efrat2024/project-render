const mongoose = require("mongoose")
const User=require("../modules/User")
const {format}=require("date-fns")

const Schema = mongoose.Schema
const vacationSchema = new Schema({
     name: {
        type: String,
        required: true,
        unique: true
    },
   startDate:
   {
type:Date,
default:format(new Date(),"yyyy-MM-dd"),
required: true,
default:"2020-01-30"  

   },
   endDate:
   {
    type:Date,
   default:format(new Date(),"yyyy-MM-dd"),
    required: true,
    default:"2021-02-30"  
   },
    active: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
        required: true,
       
    },
    location: {
        type: String,
        required: true
    },
    registeredVactioners: [{
        users: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        purchaseDate:{
            type:Date,
        require:false 
        }
      
    }],
    images:[{
        type:String,
        default:''
    }] ,
     purchaseDate:{
            type:Date,
        default:format(new Date(),"yyyy-MM-dd"),
        default:"2021-02-30"  
        }

}, { timestamps: true })
module.exports = mongoose.model("Vacation", vacationSchema)
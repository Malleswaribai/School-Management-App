const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true // here we are trimming the spaces before and after the first name
    },
    userName: {
        type: String, 
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String, 
        required: true, 
        trim: true
    },
    dob:{
        type:Date ,
        required:true,
    },
    phone:{
        type:String ,
        required:true,
        trim:true,
        unique:true
    },
    feePaid: {
        type: Boolean,
        required: true
    },
    class : {
        type: String
    }
} , {timestampst:true});
var Students = mongoose.model('Students',StudentSchema); 
module.exports = Students;
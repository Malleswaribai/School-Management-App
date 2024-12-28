const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TeacherSchema = new Schema({
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
    salary: {
        type: String
    },
    assignedClass : {
        type: String
    }
} , {timestampst:true});
var Teachers = mongoose.model('Teachers',TeacherSchema); 
module.exports = Teachers;
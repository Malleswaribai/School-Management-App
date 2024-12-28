const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClassSchema = new Schema({
    className:{
        type: String,
        required:true,
        trim:true 
    },
    year: {
        type: String, 
        required: true, 
        trim: true
    },
    teacherId:{
        type: String 
    },
    studentFee: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required:true
    },
    studentList: {
        type: Array
    }
} , {timestampst:true});
var ClassRooms = mongoose.model('ClassRooms',ClassSchema); 
module.exports = ClassRooms;
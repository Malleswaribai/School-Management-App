const express = require('express');
const StudentSchema = require('../Schemas/students'); 
const TeacherSchema = require('../Schemas/teachers'); 
const router = express.Router();

router.post('/' , async (req,res) => {
    const user = req.body; 
    const isStudent = user.isStudent , isTeacher = user.isteacher; 

    const scheema = isStudent ? StudentSchema : TeacherSchema; 

    const registeredUser = await scheema.findOne({userName: user.userName}) ;
    
    const responseObj = {
        userNotFound : false, 
        invalidPass: false,
        success: true
    }
    
    if(!registeredUser) {
        responseObj.userNotFound = true; 
        responseObj.success = false
    }
    else if(user.password != registeredUser.password) {
        responseObj.invalidPass = true; 
        responseObj.success = false
    }

    if(responseObj.success) {
        req.session.user = registeredUser;
    }
    res.send(responseObj);
});

module.exports = router;
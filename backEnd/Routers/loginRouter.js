const express = require('express');
const StudentSchema = require('../Schemas/students'); 
const TeacherSchema = require('../Schemas/teachers'); 
const router = express.Router();

router.post('/' , async (req,res) => {
    const user = req.body; 
    const isStudent = user.isStudent , isTeacher = user.isteacher; 

    if (user && user.isAdmin) {
        if(user.userName === "admin" && user.password === "admin") {
            res.send({
                userNotFound : false,
                invalidPass: false, 
                success: true, 
                isAdmin: true, 
                user:{
                    name: "admin", 
                    userName: "admin",
                    userId: "null",
                    role: "admin" 
                }
            })
            req.session.user = {
                isAdmin : true
            }
            return;
        }
        res.send({
            userNotFound : false, 
            invalidPass: true,
            success: false,
            user : null
        })
        return;
    }

    const scheema = isStudent ? StudentSchema : TeacherSchema; 

    const registeredUser = await scheema.findOne({userName: user.userName}) ;
    
    const responseObj = {
        userNotFound : false, 
        invalidPass: false,
        success: true,
        user : null
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
        responseObj.user = {
            name: registeredUser.name, 
            userName: registeredUser.userName,
            userId: registeredUser._id,
            role: isStudent ? 'student' : 'teacher' 
        }
    }
    res.send(responseObj);
});

module.exports = router;
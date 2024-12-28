const express = require('express');
const StudentSchema = require('../Schemas/students');
const TeacherSchema = require('../Schemas/teachers');
const Students = require('../Schemas/students');

const router = express.Router(); 

router.post('/' , async (req,res) => {
    console.log(req.body); 
    const user = req.body; 

    const isStudent = user.isStudent; 
    const isTeacher = user.isTeacher; 
    const data = {
        name: user.name, 
        userName : user.userName, 
        password: user.password, 
        gender: user.gender, 
        dob: user.dob, 
        phone: user.phone,
    }

    

    if (isStudent) {

        let student = await StudentSchema.findOne({userName: data.userName}); 

        if(student && student.length > 0) {
            res.send("UsrNameExists");
            return; 
        }

        student = await StudentSchema.findOne({phone: data.phone});
        

        if (student && Students.length > 0) {
            res.send("PhoneNoExists");
            return; 
        }

        data.feePaid = false ; 
        data.class = null; 
        StudentSchema.create(data).then((err) => {
            console.log("I am created student", err);
        })
    }
    
    if(isTeacher) {
        
        let teacher = await TeacherSchema.findOne({userName: data.userName});

        if(teacher && teacher.length > 0) {
            res.send("UsrNameExists"); 
            return; 
        }

        teacher = await TeacherSchema.findOne({phone: data.phone}); 
        
        if (teacher && teacher.lenght > 0) {
            res.send("PhoneNoExists");
            return; 
        }

        data.salary = null; 
        data.assignedClass = null; 
        TeacherSchema.create(data);
    }



    res.send(true); 
})

module.exports = router;
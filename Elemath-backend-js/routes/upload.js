const multer = require('multer');
const xlsx = require('xlsx');
const Student = require('../models/students'); // your student model
const classes = require('../models/class.js');
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const studentenrolled = require('../models/student');
// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        

        const uploadDir = './uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Upload Route
router.post('/upload', upload.single('file'), async (req, res) => {
    const {classId}= req.body

    try {
        if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
        }
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        let extractedStudents = [];
        const characters = [
                '/characters/robot.png' ,
                '/characters/berry.png' ,
                '/characters/blood.png',
                '/characters/dragon.png' ,
                '/characters/Ele.png' ,
                '/characters/froggy.png',
                '/characters/green.png',
                '/characters/grey.png',
                '/characters/kiss.png',
                '/characters/lazy.png',
                '/characters/longneck.png',
                '/characters/pickel.png',
                '/characters/rat.png',
                '/characters/robot.png',
                '/characters/slow.png',
                '/characters/takos.png',
               '/characters/think.png',
                '/characters/yellow.png',
               ];
        
        
        for (let row of json) {
            for (let cell of row) {
                const matchLRN = String(cell).match(/^(\d{12})$/); // detect LRN (12 digits)
                if (matchLRN) {
                    const lrn = matchLRN[1];

                    const alreadyInDB = await Student.findOne({ lrn });

                    if (alreadyInDB) {
                        const num = Math.floor(Math.random() * characters.length);
                        const enrolled = await studentenrolled.findOne({ lrn: lrn });
                        if(!enrolled){
                            const studenten_rolled = new studentenrolled({
                                    profile:characters[num],
                                    firstname:alreadyInDB.firstName,
                                    middlename:alreadyInDB.middlename,
                                    lastname:alreadyInDB.lastName,
                                    lrn:alreadyInDB.lrn,
                                    email:alreadyInDB.lrn,
                                    password:alreadyInDB.lrn,
                                    classId:classId
                                });
                            const puen =await studenten_rolled.save();
                            await classes.updateOne(
                                  { _id: classId },
                                  {
                                    $push: {
                                      studentIds: puen._id.toString(),
                                    }
                                  }
                                );
                            // continue;
                        }else{
                            
                            extractedStudents.push(alreadyInDB);
                            // const nameRow = row; // Assuming name is on same row
                            // const fullName = nameRow.slice(1).join(' ').trim(); // after LRN

                            // const nameParts = fullName.match(/^([\w\-']+),\s+([\w\-']+)(?:\s+([\w\-']+))?$/);
                            // if (nameParts) {
                            //     const [, lastName, firstName, middleName = ''] = nameParts;
                            //     ;
                            // }
                        }
                        
                    }

                    
                }
            }
        }
        res.json({ count: extractedStudents.length, students: extractedStudents });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to process the file' });
    }
});
module.exports = router;

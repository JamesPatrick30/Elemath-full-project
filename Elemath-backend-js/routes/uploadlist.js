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
router.post('/uploadlist', upload.single('file'), async (req, res) => {
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
        
        const lrns = [];

        const students = [];

        for (let row of json) {
            if (!row || row.length < 4) continue; // skip short or empty rows

            // Check male student slot
            const lrnMale = String(row[0] || '').match(/^\d{12}$/);
            const nameMale = row[3];
            if (lrnMale && typeof nameMale === 'string' && nameMale.includes(',')) {
                const { lastName, firstName, middleName } = parseName(nameMale);
                students.push({
                    lrn: lrnMale[0],
                    gender: 'Male',
                    lastName,
                    firstName,
                    middleName
                });
                lrns.push(lrnMale[0]);
            }

            // Check female student slot
            const lrnFemale = String(row[5] || '').match(/^\d{12}$/);
            const nameFemale = row[7];
            if (lrnFemale && typeof nameFemale === 'string' && nameFemale.includes(',')) {
                const { lastName, firstName, middleName } = parseName(nameFemale);
                students.push({
                    lrn: lrnFemale[0],
                    gender: 'Female',
                    lastName,
                    firstName,
                    middleName
                });
                lrns.push(lrnFemale[0]);
            }
        }



        // const studentsfinds = await Student.find({ lrn : { $in : lrns}});

        // console.log('in the list : '+ studentsfinds);
        console.log('lrns : ' + lrns);
        console.log('count : '+ students.length);
        res.json({ count:'hehe'});

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to process the file' });
    }
});
// Helper to extract name parts
function parseName(fullName) {
    const parts = fullName.split(',').map(s => s.trim());
    const lastName = parts[0];
    // const firstAndMiddle = parts[1]?.split(',').map(s => s.trim()) || [];
    const firstName = parts[1] || '';
    const middleName = parts[2] || '';
    return { lastName, firstName, middleName };
}

module.exports = router;

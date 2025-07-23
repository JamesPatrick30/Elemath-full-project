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

function extractStudentsFromRow(row) {
    const tokens = row.trim().split(/\s+/);
    const students = [];
    let tempNameParts = [];
    let currentGrade = null;

    for (let token of tokens) {
        if (/^\d{12}$/.test(token)) {
            // We've hit the LRN → finalize the name
            const lrn = token;
            const fullName = tempNameParts.join(' ').trim();
            if (fullName) {
                students.push({ lrn, fullName });
            }
            tempNameParts = [];
            currentGrade = null; // reset for next student
        } else if (/^\d{1,2}$/.test(token)) {
            // Possible grade level (like "9")
            currentGrade = token;
        } else {
            // Likely part of a name
            tempNameParts.push(token);
        }
    }

    return students;
}

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
        
        const lrns = [];

        for (let row of json) {
            for (let cell of row) {
                const matchLRN = String(cell).match(/^(\d{12})$/); // detect LRN (12 digits)
                if (matchLRN) {
                    const lrn = matchLRN[1];
                    const nameRow = row; // Assuming name is on same row
                    const fullname = nameRow.slice(1).join(' ').trim();

                    const nameParts = fullname.match(/^([\w\-']+),\s+([\w\-']+)(?:\s+([\w\-']+))?$/);
                    console.log('row : '+extractStudentsFromRow(fullname));
                    lrns.push(lrn);
                }
            }
        }

        let fulldata = [];
        const students = await Student.find({ lrn : { $in : lrns}});
        const existingLRNs = students.map(s => s.lrn);

        const enrolled = await studentenrolled.find({ lrn : { $in : existingLRNs}});

        const enrolledLRNs = enrolled.map(e => e.lrn);

        // Students that are not yet enrolled
        const missing = students.filter(student => !enrolledLRNs.includes(student.lrn));


        if (missing.length === 0) {
            console.log('All students are already enrolled');
            return res.status(204).json({ message: 'All students are already enrolled', enrolled });
        }
        for(let student in missing){
            const num = Math.floor(Math.random() * characters.length);
            console.log('data : '+student);
            fulldata.push({
                profile:characters[num],
                firstname:missing[student].firstName,
                middlename:missing[student].middlename,
                lastname:missing[student].lastName,
                lrn:missing[student].lrn,
                email:missing[student].lrn,
                password:missing[student].lrn,
                classId:classId
            });
        }
        console.log(fulldata);
        const inserted = await studentenrolled.insertMany(fulldata);
        const studentIds = inserted.map(s => s._id);

        await classes.updateOne(
        { _id: classId },
        { $push: { studentIds: { $each: studentIds } } }
        );
        res.json({ count: extractedStudents.length, students: fulldata });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to process the file' });
    }
});
module.exports = router;

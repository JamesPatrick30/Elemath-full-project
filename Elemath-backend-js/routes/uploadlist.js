const multer = require('multer');
const xlsx = require('xlsx');
const express = require('express');
const router = express.Router();
const fs = require('fs');

const studentdb = require('../models/studentlist');
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
    // const {classId}= req.body

    try {
        if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
        }
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        let extractedStudents = [];
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
                    name:nameMale,
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
                    name:nameFemale,
                    gender: 'Female',
                    lastName,
                    firstName,
                    middleName
                });
                lrns.push(lrnFemale[0]);
            }
        }
        const enrolled = await studentdb.find({ lrn : { $in : lrns}});
        
        const enrolledLRNs = enrolled.map(e => e.lrn);

        // Students that are not yet enrolled
        const missing = students.filter(student => !enrolledLRNs.includes(student.lrn));
        

        const db = await studentdb.insertMany(missing);
        console.log('db : ' +missing);
        console.log('lrns : ' + enrolled);
        console.log('count : '+ students.length);
        res.json({ studentReadCount :students.length,insterted : db,enrolled : enrolled});

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

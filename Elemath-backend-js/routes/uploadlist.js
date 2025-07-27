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
        console.log(json);
        const lrns = [];
        const failed = [];

        const students = [];
        let rowcount = 0;
        for (let row of json) {
            rowcount++;
            // if(rowcount <60){
            //     console.log('rowcount : '+ rowcount);
            // }
            
            if (!row || row.length < 3) continue; // skip short or empty rows

            let lrnMale = null;
            let maleleng = 0;
            let templrn = '';
            do{
                lrnMale = String(row[maleleng] || '').trim().match(/^\d{12}$/);
                templrn = row[maleleng];
                if (
                    rowcount > 17 &&
                    typeof templrn === 'string' &&
                    !templrn.trim().match(/^\d{12}$/) &&
                    rowcount <50
                ) {
                    // failed.push({name: templrn , lrn : null});
                    console.log('failed in lrn: ' + templrn);
                    break;
                }
                maleleng++;
            }while(lrnMale == null && row.length > maleleng);

            let nameMale = null;
            let nameMalefound = false;
            do {
                nameMale = row[maleleng];
                // console.log('name choice : '+ nameMale);
                if (
                    nameMale &&
                    typeof nameMale === 'string' &&
                    (nameMale.includes(',') || nameMale.includes('.'))
                ) {
                    nameMalefound = true;
                } else if (String(row[maleleng] || '').trim().match(/^\d{12}$/)) {
                    // Stop the loop if another LRN is found
                    failed.push({name: null , lrn : lrnMale});
                    nameMale = '';
                    
                    break;
                }
                maleleng++;
            } while (!nameMalefound && row.length > maleleng);
            // console.log('male lrn : '+ lrnMale + ' male name : '+ nameMale);

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
            }else if (rowcount < 50 && rowcount > 16 && ( typeof nameMale !== 'string' || !lrnMale)){
                console.log('failed Male: name : '+nameMale+' lrn : '+lrnMale + ' row : '+rowcount);
                if(typeof nameMale !== 'string'){
                    failed.push({name: null , lrn : nameMale});
                }else{
                    failed.push({name: nameMale , lrn : lrnMale});
                }
                
            }
            // Only iterate over relevant indices to avoid unnecessary checks
            
            

            // Check female student slot
            let lrnFemale = null;
            let leng = maleleng;
            do{
                lrnFemale = String(row[leng] || '').trim().match(/^\d{12}$/);
                leng++;
            }while(lrnFemale == null && row.length > leng);
            const nameFemale = row[row.length - 1];
            // console.log('female name : ' + lrnFemale + 'female : '+ nameFemale);
            // console.log('female : '+ nameFemale);


            if (
                lrnFemale &&
                typeof nameFemale === 'string' &&
                (nameFemale.includes(',') || nameFemale.includes('.'))
            ) {
                const { lastName, firstName, middleName } = parseName(nameFemale);
                students.push({
                    lrn: lrnFemale[0],
                    name: nameFemale,
                    gender: 'Female',
                    lastName,
                    firstName,
                    middleName
                });
                lrns.push(lrnFemale[0]);
            }else if (rowcount < 50 && rowcount > 16 && nameMale !== nameFemale &&(typeof nameFemale !== 'string' || !lrnFemale)){
                console.log('failed feMale: name : '+nameFemale+' lrn : '+lrnFemale + ' row : '+rowcount);
                if(typeof nameFemale !== 'string'){
                    failed.push({name: null , lrn : lrnFemale});
                }else{
                    failed.push({name: nameFemale , lrn : lrnFemale});
                }
            }
        }
        const enrolled = await studentdb.find({ lrn : { $in : lrns}});
        
        const enrolledLRNs = enrolled.map(e => e.lrn);
        const male = students.filter(student => student.gender === 'Male');
        const female = students.filter(student => student.gender === 'Female');
        console.log('male : '+male.length+' female : '+ female.length);
        for(fail of failed){
            console.log('lrn : '+fail.lrn + ' name : '+fail.name);
        }
        
        // Students that are not yet enrolled
        const missing = students.filter(student => !enrolledLRNs.includes(student.lrn));
        

        const db = await studentdb.insertMany(missing);
        // console.log('db : ' +missing);
        // console.log('lrns : ' + enrolled);
        // console.log('count : '+ students.length);
        res.json({ studentReadCount :students.length,insterted : db,enrolled : enrolled, failed : failed });

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

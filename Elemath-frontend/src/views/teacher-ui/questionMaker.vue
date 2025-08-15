<template>
    <main>
        <button class="btn-back" v-on:click="backBtn()">Back</button>
        <div class="con-q">
            <nav>
                <ul>
                    <li><button class="nav-btn" @click="navClick('Settings')" :class="btnActive.setting? 'activeBtn' : 'not-active'">Settings</button></li>
                    <li><button class="nav-btn" @click="navClick('Question')" :class="btnActive.Question? 'activeBtn' : 'not-active'" >Question</button></li>
                    <li><button class="nav-btn" @click="navClick('file')" :class="btnActive.file? 'activeBtn' : 'not-active'">Upload file</button></li>
                </ul>
            </nav>
            <div class="con-settings" v-if="btnActive.setting">
                <input type="text" placeholder="Time" class="input-a">
                <input type="text" placeholder="Passing Score" class="input-a">
            </div>
            <div class="con-Questions" v-if="btnActive.Question">
                <select name="" id="" v-model="questionOption" >
                    <option value="Generate">Generate</option>
                    <option value="Costumize">Costumize</option>
                </select>
                


                <div class="con-generate" v-if="questionOption === 'Generate'">
                    <select class="t-o-q" v-model="questionGenerateSetting.type"  >
                        <option disabled value="">-- Select a type --</option>
                        <option value="multiple choices">Multiple Choice</option>
                        <option value="Costumize">Costumize</option>
                    </select>
                    <select name="Topic" class="t-o-q" v-model="questionGenerateSetting.topic" >
                        <option disabled value="">-- Select a Math Topic --</option>
                        <!-- Grade 5 Topics -->
                        <option disabled>Grade 5 Topics</option>
                        <option value="Place Value and Rounding">Place Value and Rounding</option>
                        <option value="Multiplying and Dividing Fractions">Multiplying and Dividing Fractions</option>
                        <option value="Operations on Decimals">Operations on Decimals</option>
                        <option value="Measurement (Length, Mass, Capacity)">Measurement (Length, Mass, Capacity)</option>
                        <option value="Volume and Surface Area of Solids">Volume and Surface Area of Solids</option>
                        <option value="Simple and Compound Interest">Simple and Compound Interest</option>
                        <option value="Interpreting Data and Graphs">Interpreting Data and Graphs</option>
                        <option value="Angles and Triangles">Angles and Triangles</option>

                        <!-- Grade 6 Topics -->
                        <option disabled>Grade 6 Topics</option>
                        <option value="Ratio and Proportion">Ratio and Proportion</option>
                        <option value="Percent and Its Applications">Percent and Its Applications</option>
                        <option value="Algebraic Expressions">Algebraic Expressions</option>
                        <option value="Patterns and Number Sequences">Patterns and Number Sequences</option>
                        <option value="Geometry of Solids">Geometry of Solids</option>
                        <option value="Statistics and Probability">Statistics and Probability</option>
                        <option value="Speed, Distance, and Time">Speed, Distance, and Time</option>
                        <option value="Problem Solving with Multi-step Word Problems">Problem Solving with Multi-step Word Problems</option>
                    </select>
                    <select class="t-o-q" v-model="questionGenerateSetting.lang"  >
                        <option disabled value="">-- Language --</option>
                        <option value="English">English</option>
                        <option value="Tagalog">Tagalog</option>
                    </select>

                    <select class="t-o-q" v-model="questionGenerateSetting.difficulty"  >
                        <option disabled value="">-- Select Difficulty --</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="very-hard">Very Hard</option>
                    </select>
                    <button class="generate-btn">Generate!</button>
                </div>
                <div v-if="questionOption === 'Costumize'" class="Costumize">
                    <textarea  class="q-input" id="" placeholder="Question.." v-model="CostumeQuestion.Q"></textarea>
                    <select class="t-o-q" v-model="CostumeQuestion.type"  >
                        <option disabled value="">-- Select a type --</option>
                        <option value="multiple choices">Multiple Choice</option>
                        <option value="input answer">input answer</option>
                    </select>
                    <br>
                    <div class="multi" v-if="CostumeQuestion.type === 'multiple choices'">
                        <input class="input-c" type="text" v-model="CostumeQuestion.choices[0]" placeholder="choices...">
                        <input class="input-c" type="text" v-model="CostumeQuestion.choices[1]" placeholder="choices...">
                        <input class="input-c" type="text" v-model="CostumeQuestion.choices[2]" placeholder="choices...">
                        <input class="input-c" type="text" v-model="CostumeQuestion.choices[3]" placeholder="choices...">
                        <select class="t-o-q" v-model="CostumeQuestion.answer"  >

                        <option disabled value="">-- Select a Answer --</option>
                            <option v-for="Choice in CostumeQuestion?.choices.filter(choice => choice.trim() !== '')" :key="Choice" :value="Choice" @click="" >{{ Choice }}</option>
                            
                        </select>
                    </div>
                    <div class="con-input-a" v-else-if="CostumeQuestion.type==='input answer'">
                        <input type="text" class="input-a" placeholder="Answer.." v-model="CostumeQuestion.answer">
                    </div>
                    
                </div>
                <button class="btn-add" @click="addQuestion()">Add..</button>
            </div>
            <div class="con-file" v-if="btnActive.file">
                <label for="moduleFile" class="upload-label">
                    📄 Upload Module / Lesson File
                    <input
                        type="file"
                        id="moduleFile"
                        accept=".pdf"
                        @change="handleFileUpload"
                        hidden
                    />
                    </label>
                    <p v-if="fileName" class="file-name">Selected: {{ fileName }}</p>

                    <select class="t-o-q" v-model="questionGenerateSetting.type"  >
                        <option disabled value="">-- Select a Language --</option>
                        <option value="multiple choices">Multiple Choice</option>
                        <option value="Costumize">Costumize</option>
                    </select>
                    <input type="file" @change="onFileChange" />
                    <button @click="uploadLesson">Upload</button>
                    <p v-if="progress">Progress: {{ progress }}%</p>
                    <input type="number" placeholder="Number" v-model="uploadGenerate.num_questions">
                    <select class="t-o-q" v-model="uploadGenerate.type"  >
                        <option disabled value="">-- Select a type --</option>
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="short-answer">short-answer</option>
                        <option value="true-false">true-false</option>
                        <option value="fill-in-the-blank">fill-in-the-blank</option>
                    </select>
                    
                    <select class="t-o-q" v-model="uploadGenerate.lang"  >
                        <option disabled value="">-- Language --</option>
                        <option value="English">English</option>
                        <option value="Tagalog">Tagalog</option>
                    </select>

                    <select class="t-o-q" v-model="uploadGenerate.difficulty"  >
                        <option disabled value="">-- Select Difficulty --</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="very-hard">Very Hard</option>
                    </select>
                    <button class="generate-btn" @click="generateQuestion()">Generate!</button>

            </div>
        </div>
      <div class="con-lobby">
        <nav>
            <ul>
                <li><button @click="navLobby('players')" :class="btnLobby.playes? 'activeBtn' : 'not-active'">Players</button></li>
                <li><button @click="navLobby('questions')" :class="btnLobby.Question? 'activeBtn' : 'not-active'" >Question</button></li>
                
            </ul>
        </nav>
        <div v-if="btnLobby.playes" class="con-p">
            <h3>Players : {{ players.length }}</h3>
            <div class="con-w-p" >
                <div class="players"v-for="(player, index) in players" :key="index" :draggable="true">
                    {{ player.name }}
                </div>
            </div>
            
        </div>
        <div v-if="btnLobby.Question" class="con-qs">
            <h3>Questions : {{ questions.length }}</h3>
            <div class="question" v-for="(question,index) in questions" :key="question" :id="index">
                <h4>No.{{ index + 1 }}</h4>
                <!-- TODO: fix the data -->
                <p class="type">{{ question?.topic }}</p>
                <p class="type">{{ question?.type }}</p>
                <!-- <p class="type">{{ question.language }}</p> -->
                 <table border="1" cellpadding="5">
                    <tbody>
                    <tr v-for="(row, rIndex) in parseTables(question?.table)" :key="rIndex">
                        <td>{{ row.country }}</td>
                        <td>{{ row.population }}</td>
                    </tr>
                    </tbody>
                </table>
                <p v-if="question?.story">Story : {{ question?.story }}</p>
                <p>{{ question.question }}</p>
                <div class="multi" v-if="question?.options">
                    <div class="choices" v-for="Choice in question.options" :key="Choice" :class="(Choice===question.answer)? 'r-answer':'w-answer'" >
                        {{ Choice }}
                    </div>
                </div>
                <div class="con-input-a" v-else>
                    <div class="input-answer" >
                      Answer:{{ question.answer }}
                    </div>
                </div>
                <p> Explanation : {{ question.explanation }}</p>
                
            </div>
        </div>
      </div>
      <button class="btn-start">start</button>
    </main>
    
</template>
<script>
import socket from '@/socket';
import api from '@/axios';
export default{
    data(){
        return{
            uploadGenerate:{num_questions:0,type:'',topic:'',lang:'',difficulty:''},
            progress : 0,
            file : null,
            btnActive:{setting:true,Question:false,file:false},
            btnLobby:{playes:false,Question:true},
            questionOption:'Costumize',

            players : [
                { name: 'James Patrick', lrn: '864178547844' },
                { name: 'Alyssa Mae', lrn: '712345678901' },
                { name: 'Marco Antonio', lrn: '623498713250' },
                { name: 'Elaine Grace', lrn: '912378452167' },
                { name: 'Jared Anthony', lrn: '834512967340' },
                { name: 'Sophia Heart', lrn: '789431258610' },
                { name: 'Liam Gabriel', lrn: '675849123045' },
                { name: 'Chloe Anne', lrn: '702134958712' },
                { name: 'Daniel Reyes', lrn: '834159762380' },
                { name: 'Isabella Cruz', lrn: '912367845912' },
                { name: 'Nathaniel Kyle', lrn: '691237845981' },
                { name: 'Mikaela Joy', lrn: '710298345712' },
                { name: 'Adrian Blake', lrn: '843215967124' },
                { name: 'Bianca Rose', lrn: '764839125601' },
                { name: 'Ethan Cruz', lrn: '875312964178' },
                { name: 'Alexa Faith', lrn: '793415289031' },
                { name: 'Zachary Neil', lrn: '681235794601' },
                { name: 'Jasmine Rae', lrn: '904378214678' },
                { name: 'Caleb Shawn', lrn: '823745190623' },
                { name: 'Nicole Bea', lrn: '745931280147' },
                ].sort((a, b) => a.name.localeCompare(b.name)),
            
            questionGenerateSetting:{type:'',topic:'',lang:'',difficulty:''},

            questions:[
                // { Q: 'What is 5 + 3?', type: 'input answer', answerType: 'number', answer: '8' },
                // { Q: 'What is 12 - 4?', type: 'input answer', answerType: 'number', answer: '8' },
                // { Q: 'What is the place value of 7 in 374?', type: 'input answer', answerType: 'number', answer: '70' },
                // { Q: 'What is the shape with 3 sides?', type: 'multiple choices', answer: 'Triangle', choices: ['Circle', 'Rectangle', 'Triangle', 'Square'] },
                // { Q: 'Which number is even?', type: 'multiple choices', answer: '8', choices: ['3', '5', '7', '8'] },
                // { Q: 'What is 4 × 6?', type: 'input answer', answerType: 'number', answer: '24' },
                // { Q: 'What is 30 ÷ 5?', type: 'input answer', answerType: 'number', answer: '6' },
                // { Q: 'Which number is greater?', type: 'multiple choices', answer: '45', choices: ['12', '20', '45', '33'] },
                // { Q: 'What is the missing number: 3, 6, __, 12?', type: 'input answer', answerType: 'number', answer: '9' },
                // { Q: 'What is 100 - 75?', type: 'multiple choices', answer: '25', choices: ['35', '25', '50', '30'] },
                // { Q: 'What is 9 + 8?', type: 'input answer', answerType: 'number', answer: '17' },
                // { Q: 'Which of the following is a quadrilateral?', type: 'multiple choices', answer: 'Rectangle', choices: ['Circle', 'Rectangle', 'Triangle', 'Cone'] },
                // { Q: 'What is 10 more than 65?', type: 'input answer', answerType: 'number', answer: '75' },
                // { Q: 'Which shows a correct fraction: ½?', type: 'multiple choices', answer: 'Half', choices: ['Whole', 'One-third', 'Half', 'Zero'] },
                // { Q: 'What is 7 × 5?', type: 'input answer', answerType: 'number', answer: '35' },
                // { Q: 'What is the perimeter of a square with side 4?', type: 'input answer', answerType: 'number', answer: '16' },
                // { Q: 'Which is a unit of length?', type: 'multiple choices', answer: 'Meter', choices: ['Liter', 'Gram', 'Meter', 'Kilogram'] },
                // { Q: 'What is 9 less than 20?', type: 'input answer', answerType: 'number', answer: '11' },
                // { Q: 'How many sides does a hexagon have?', type: 'input answer', answerType: 'number', answer: '6' },
                // { Q: 'What is the product of 3 and 9?', type: 'multiple choices', answer: '27', choices: ['36', '18', '27', '30'] }
            ],
            fileId: '',
            CostumeQuestion:{Q:'',type:'',answer:'',answerType:'',choices:[]},
            id: this.$route.query.i
        }
    },
    methods:{
        parseTables(rawData) {
            if (!rawData || typeof rawData !== 'string') {
                return []
            }

            // Split by "table:" marker
            const tables = rawData
                .split(/table:\s*'/)
                .filter(t => t.trim() !== '')
                .map(t => t.replace(/'$/, '').trim())

            return tables.map(tableText => {
                const lines = tableText.split('\n').map(l => l.trim()).filter(l => l)
                const dataLines = lines.slice(1) // remove the first row (header)
                return dataLines.map(line => {
                const match = line.match(/^(.+?)(\d+)$/)
                return {
                    country: match ? match[1].trim() : '',
                    population: match ? parseInt(match[2], 10) : 0
                }
                })
            })
            },
        async backBtn(){
            try{
                const res = await api.post('/delete/mode',{id:this.id});

                // alert(res.data.message);
                this.$router.push('/th');
            }catch(err){
                console.log(err);
            }
        },
    onFileChange(event) {
        this.file = event.target.files[0];
    },

    async uploadLesson() {
        if (!this.file) {
            alert("Please select a file first.");
            return;
        }
        this.progress = 0;
        const formData = new FormData();
        formData.append("lessonFile", this.file); // must match backend

        try {
            const res = await api.post("/lesson/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
                this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            }
            });

            console.log("✅ File uploaded:", res.data);
            this.fileId = res.data.id;
            // this.rawText = res.data.rawText;
            
            // res.data.quiz.forEach(q => {
            //     this.questions.push(q);
            // });
            alert("Lesson uploaded successfully!");
        } catch (err) {
            console.error("❌ Upload failed:", err);
            alert('try again. someting went wrong.')
        }
        },

        navClick(btn){
            this.btnActive.setting = false;
            this.btnActive.Question = false;
            this.btnActive.file = false;

            switch(btn){
                case 'Settings':
                    this.btnActive.setting = true;
                break;
                case 'Question':
                    this.btnActive.Question = true;
                break;
                case 'file':
                    this.btnActive.file = true;
                break;
            }
        },
        navLobby(btn){
            this.btnLobby.Question = false;
            this.btnLobby.playes=false;

            switch(btn){
                case 'players':
                    this.btnLobby.playes = true;
                break;
                case 'questions':
                    this.btnLobby.Question=true;
                break;
            }
        },
        addQuestion() {
            // Validate inputs
            if (!this.CostumeQuestion.Q || !this.CostumeQuestion.answer) {
                alert('Please fill in both the Question and the Answer.');
                return;
            }

            // Push the new question
            this.questions.push({
                question: this.CostumeQuestion.Q,
                type: this.CostumeQuestion.type,
                answerType: '',
                answer: this.CostumeQuestion.answer,
                options: this.CostumeQuestion.choices.filter(choice => choice.trim() !== '')
            });

            // Scroll to the new question after DOM updates
            this.$nextTick(() => {
                const index = this.questions.length - 1;
                const el = document.getElementById(index.toString());
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            });

            // Reset form (CostumeQuestion)
            this.CostumeQuestion = {
                Q: '',
                type: 'multiple choices', // or whatever default
                answer: '',
                choices: []
            };
        },
        async generateQuestion(){
            try{
                const res = await api.post('/create-question',{
                    fileId:this.fileId,
                    num_questions:this.uploadGenerate.num_questions,
                    language:this.uploadGenerate.lang,
                    difficulty:this.uploadGenerate.difficulty,
                    question_type:this.uploadGenerate.type
                });
                res.data.quiz.forEach(q => {
                    this.questions.push(q);
                });
                console.log(res.data);
                alert('created')
            }catch(err){
                alert('Something went wrong, try again');
                console.log(err);
            }
        }

    },
    mounted(){
        socket.emit('create-room', { roomId: this.id });
        socket.on('room-created', (data) => {
            console.log('Room created:', data);
            // Handle room creation confirmation here
        });
    },
}
</script>
<style scoped>
.progress-container {
  width: 100%;
  height: 20px;
  background-color: #eee;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}
.btn-start{
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #41b8d5;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 800;
    font-size: 16px;

    transition: 0.2s;
}
.btn-back:hover,
.btn-start:hover{
    transform: scale(1.1);
    transition: 0.2s;
}
.btn-back{
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: #41b8d5;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    transition: 0.2s;
}
.btn-add{
    width: 120px;
    height: 40px;
    background-color:#96faa2 ;
    border: none;
    color:white;
    font-weight: 800;
    border-radius: 20px;

    position:relative;
    justify-self: end;
    align-self: flex-end;
    cursor: pointer;
}
.input-a{
    border: #54de63 solid;
    font-size: 15px;
    border-radius: 10px;
    height: 40px;
    width: 300px;
}
.input-a:focus{
    outline: none;
}
.input-c{
    height: 30px;
    border-radius: 6px;
    border: #91eea5 1px solid;
}
.q-input{
    height: 100px;
    width: 300px;
    scroll-behavior: smooth;
    scrollbar-width: none;
    resize: none;
    background-color: white;
    padding: 3px;
    outline: none;
    border: none;
    font-style: oblique;
    border-radius: 10px;
}
.Costumize{
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    width: 100%;
    height: inherit;
}
.file-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.upload-label {
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.upload-label:hover {
  background-color: #0056b3;
}

.file-name {
  margin-top: 10px;
  font-style: italic;
  color: #333;
}
.con-input-a{
    display: flex;
    align-items: center;
    justify-content: center;
}
.input-answer{
    background-color: #54de63;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    width: 70%;
    display: flex;
    text-align: center;
    height: 50px;
    align-items: center;
    justify-content: center;
}
.type{
    background-color: #41b8d5;
    color: white;
    font-size: smaller;
    font-weight: bold;
    width: fit-content;

    position: relative;
    justify-self: end;
    bottom: 60px;
}
.choices{
    font-weight: 800;

    min-height: 40px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;

    border-radius: 10px;
    
}
.multi{
 
    width: inherit;
    display: grid;
    grid-template-columns: 200px 200px;
    gap: 1em;
    align-items: center;
    justify-content: center;
}
.r-answer{
    background-color: #54de63;
    color: white;
}
.w-answer{
    background-color: #f58282;
    color: white;
}
.question{
    background-color: white;
    color: #41b8d5;
    font-weight: 400;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 5px;
    animation: new 1s linear ;
}
@keyframes new{
    from{
        background-color: #91eea5;
    }
    to{
        background-color: white;
    }

}
.generate-btn{
    border: none;
    width: 100px;
    height: 50px;
    border-radius: 10px;
    background-color: #82d7f5;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s linear;
}
.generate-btn:hover{
    background-color: #6ea6bb;
    transform: scale(1.1);
    transition: 0.3s linear;
}
.t-o-q{
    width: 50%;
}

.con-p{
    height: inherit;
}
.con-p h3,.con-qs h3{
    color: white;
}
.players{color: #41b8d5;
    border-radius: 10px;
    padding: 5px;
    height: 50px;
    background-color: white;
    margin-bottom: 5px;

    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
    font-weight: bold;
    text-align:start;
    align-items: center;
    justify-items: center;
    transition: background-color 0.4s ease, transform 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

}
.players:hover{
    color: #e7faff;
  background-color: rgb(219, 219, 219);
  transform: translateY(-2px) scale(1.1); /* optional lift effect */
}
.con-w-p,.con-qs {
    
    height: inherit;
    overflow-x: auto;
    scrollbar-width: none;
}
.con-generate{
    display: flex;
    flex-direction: column;
    padding: 20px;

    width: 100%;
    padding: 20px;
    gap: 10px;
}
select{
    height: 40px;
    width: 150px;
    font-size: 17px;

    border-radius: 10px;
    scroll-behavior: smooth;
    color: white;
    outline: none;
    border: none;
    background-color: #91eea5;
}
option{
    background-color: #b8ebc3;
    outline: none;
    border: none;
}
.con-settings,
.con-Questions,
.con-file{

    height: 80%;

    display: flex;
    flex-direction: column;
    align-items: center;

}
.nav-btn{
    color: white;
}
.activeBtn{
    border-bottom: 3px solid black;
}
nav ul{
    display: flex;
}
li{
    list-style: none;
}
li button{
    border: none;
    background: none;
}
main::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/bg.png'); /* Use public/ folder path */
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  z-index: -1;
}
main{
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60px;
}
.con-q,.con-lobby{
    height: 90%;
    width: 500px;
    padding: 20px;
    border-radius: 20px;
    background-color: #a7ddea;

    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
</style>
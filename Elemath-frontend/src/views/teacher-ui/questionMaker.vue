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
                <header class="top-bar">
                    
                    <h1 class="title">⚡ Powered by GPT-5</h1>
                    <!-- <img
                    class="logo"
                    src="/images/cropgptlogo.png"

                    alt="OpenAI Logo"
                    /> -->
                </header>
                <!-- <label for="moduleFile" class="upload-label">
                    📄 Upload Module / Lesson File
                    <input
                        type="file"
                        id="moduleFile"
                        accept=".pdf"
                        @change="handleFileUpload"
                        hidden
                    />
                    </label>
                    <p v-if="fileName" class="file-name">Selected: {{ fileName }}</p> -->

                    <!-- <select class="t-o-q" v-model="questionGenerateSetting.type"  >
                        <option disabled value="">-- Select a Language --</option>
                        <option value="multiple choices">Multiple Choice</option>
                        <option value="Costumize">Costumize</option>
                    </select> -->
                    <!-- <div>
                        <button><font-awesome-icon icon="fa-solid fa-upload" />Upload New</button>
                        <button><font-awesome-icon icon="fa-solid fa-file" />Select Existing</button>
                    </div> -->
                    <!-- Only show drop area while dragging -->
                    <div
                        v-if="isDragging && !generatingLoading"
                        class="drop-area"
                        @dragover.prevent
                        @dragleave.prevent="isDragging = false"
                        @drop.prevent="handleDrop"
                    >
                        <p>Drop your PDF here</p>
                    </div>

                    <!-- Hidden input to allow click selection if needed -->
                    <!-- <input
                        type="file"
                        accept="application/pdf"
                        ref="fileInput"
                        @change="onFileChangeDrag"
                        class="file-input"
                    /> -->
                    
                    <div class="file" v-if="!isDragging && !generatingLoading">
                        <input
                        v-if="!isDragging"
                        id="fileInput"
                        type="file"
                        @change="onFileChange"
                        accept="application/pdf"
                        class="file-input"
                        />

    <!-- Styled label as the "Choose File" button -->
                    <label  for="fileInput" class="file-label"><font-awesome-icon icon="fa-solid fa-upload" /> Upload New</label>
                    <button class="file-c"><font-awesome-icon icon="fa-solid fa-file" />Select Existing</button>
                    </div>
                    
                    <!-- Upload button -->
                    <!-- <button 
                    @click="uploadLesson" 
                    class="upload-btn"
                    :disabled="!file"
                    >
                    Upload
                    </button> -->

                    <!-- Progress -->
                    <p v-if="progress > 0 && progress !== 100" class="progress-text">
                        Progress: {{ progress }}%
                    </p>



                    <!-- <input type="file" @change="onFileChange" />
                    <button @click="uploadLesson">Upload</button>
                    <p v-if="progress">Progress: {{ progress }}%</p> -->
                    <div class="Question-options" v-if="fileId && !isDragging && !generatingLoading">
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
                            <button class="generate-btn" :disabled="generateBtnSwitch" @click="generateQuestion()">{{ generateBtn}}</button>

                    </div>
                    <div class="loading-generate" v-if="generatingLoading">
                        <div class="loading-r"></div>
                        <p class="typing">Generating questions...</p>
                    </div>
                    
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
                <!-- Render ASCII table safely -->
                <pre class="mono-table">{{ question.table }}</pre>
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
            isDragging: false,
            generateBtnSwitch: false,
            generateBtn:'Generate',
            uploadGenerate:{num_questions:0,type:'',topic:'',lang:'',difficulty:''},
            progress : 0,
            file : null,
            btnActive:{setting:true,Question:false,file:false},
            btnLobby:{playes:false,Question:true},
            questionOption:'Costumize',

            players : [].sort((a, b) => a.name.localeCompare(b.name)),
            
            questionGenerateSetting:{type:'',topic:'',lang:'',difficulty:''},

            questions:[],
            fileId: '',
            CostumeQuestion:{Q:'',type:'',answer:'',answerType:'',choices:[]},
            id: this.$route.query.i
        }
    },
    methods:{
        onDragOver(e) {
            this.isDragging = true; 
        },
        onDragLeave(e) {
        // Only hide if leaving the page/window
            if (e.clientX === 0 && e.clientY === 0) {
                this.isDragging = false;
            }
        },
        onDropAnywhere(e) {
          this.isDragging = false;
        },
        handleDrop(event) {
            this.fileId = '';
            const file = event.dataTransfer.files[0];
            this.handleFile(file);
        },
        onFileChangeDrag(event) {
            const file = event.target.files[0];
            this.handleFile(file);
        },
        handleFile(file) {
            if (!file) return;
            if (file.type !== "application/pdf") {
                alert("Only PDF files are allowed!");
                return;
            }
            this.file = file;
            this.progress = 0;
            this.uploadLesson();
        },
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
        this.fileId = '';
        this.file = event.target.files[0];
        this.progress = 0; // Reset progress on new file selection
        if(this.file){
            this.uploadLesson();
        }
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
                let uploaded = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                // Cap at 80% during upload
                if (uploaded < 80) {
                    this.progress = uploaded;
                }
                },
            });

            // Set progress to 100% when done
            this.progress = 100;
            console.log("✅ File uploaded:", res.data);
            this.fileId = res.data.id;

            } catch (err) {
            console.error("❌ Upload failed:", err);
            alert(err.response?.data?.message || "Something went wrong during upload.");
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
                this.generatingLoading = true;
                this.generateBtnSwitch = true;
                this.generateBtn = 'Generating...';
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
               
            }catch(err){
                alert('Something went wrong, try again');
                console.log(err);
            }
            // alert('click!')
            this.generatingLoading = false;
            this.generateBtnSwitch = false;
            this.generateBtn = 'Generate';
        }

    },
    mounted(){
        socket.connect();
        socket.removeAllListeners();


        socket.emit('create-room', { roomId: this.id });
        socket.on('room-created', (data) => {
            console.log('Room created:', data);
            alert('Room created successfully! '+data.message);
            // Handle room creation confirmation here
        });
        socket.on('player-joined', (data) => {
            console.log('Player joined:', data);
            this.players.push({ name: data.player, lrn: data.lrn, profile: data.profile });
        });
        console.log(socket.listeners('room-created').length);

        window.addEventListener("dragover", this.onDragOver);
        window.addEventListener("dragleave", this.onDragLeave);
        window.addEventListener("drop", this.onDropAnywhere);

    },
    beforeUnmount() {
    window.removeEventListener("dragover", this.onDragOver);
    window.removeEventListener("dragleave", this.onDragLeave);
    window.removeEventListener("drop", this.onDropAnywhere);
  },
}
</script>
<style scoped>
.loading-generate{
    display: flex;
    gap:  10px;
}
.loading-r{
  border: 4px solid rgba(0, 0, 0, 0.1); /* light gray background */
  border-top-color: #2563eb;             /* colored part of spinner */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes fade-caret {
  0%   { opacity: 0; }
  50%  { opacity: 1; }
  100% { opacity: 0; }
}

.typing {
    color: white;
  display: inline-block;
  animation: fade-caret 3s ease-in-out infinite;
}


.Question-options{
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}
.drop-area {
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 4px dashed #2563eb;
  border-radius: 12px;
  background: rgba(224, 231, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  color: #1f2937;
  font-size: 1.25rem;
}
.top-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  /* background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb; */
  /* justify-self: end; */
  align-self: self-end;
  left: auto;
}
.logo {
  width: 20px;
  height: auto;
}
.title {
  font-size: 0.8rem;
  font-weight: bold;
  color: #111827;
}
.upload-box {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  max-width: 320px;
  background: #fafafa;
}

.file{
    display: flex;
    gap: 1em;
}
/* Hide ugly native input */
.file-input {
  display: none;
}.file-label,
.file-c {
  display: inline-flex;          /* Align icon and text horizontally */
  align-items: center;           /* Vertically center content */
  justify-content: center;
  height: 40px;                  /* Set same height */
  padding: 0 16px;               /* Horizontal padding */
  font-size: 16px;
  border: 1px solid #2563eb;    /* Optional styling */
  border-radius: 6px;
  background-color: #2563eb;
  color: white;
  cursor: pointer;
  gap: 8px;                      /* Space between icon and text */
  transition: background-color 0.2s;
}

.file-label:hover,
.file-c:hover {
  background-color: #1e40af;
}

.file-input {
  display: none;                 /* Hide the actual file input */
}

.file-label:hover {
  background: #1e40af;
}

.upload-btn {
  padding: 0.5rem 1rem;
  background: #111827;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.upload-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.progress-text {
  font-size: 0.85rem;
  color: #374151;
}
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
    min-height: 50px;
    height: fit-content;
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
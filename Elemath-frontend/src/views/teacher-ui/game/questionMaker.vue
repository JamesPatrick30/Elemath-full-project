<template>
    <div class="file-cluster" v-if="fileCluster">
        
        <div class="file-list">
            <button @click="fileCluster = false" class="close-btn"><font-awesome-icon icon="fa-solid fa-xmark" style="color: #ff0000;" size="lg"/></button>
            <h2>File List</h2>
            <div class="loading-con" v-if="fileloading">
                <div class="loading"></div>
            </div>
            
           
            <div class="file-in">
                <div class="file-l" v-for="(file, index) in filelist" :key="index" @click="selectFile(file._id,file.title)">
                    <h4>{{ file.title }}</h4>
                    <!-- <p>{{ file.summary }}</p> -->
                </div>
                <div v-if="!fileloading && filelist.length === 0" class="no-file">
                    <p>No files available. Please upload a file first.</p>
                </div>
                <h3 style="margin-top: 20px;">Grade 5</h3>
                <div class="fileD" v-for="(file, index) in sortgrade5()" :key="index" @click="selectFile(file._id,file.title)">
                    <h4>{{ file.title }}</h4>
                    <!-- <p>{{ file.summary }}</p> -->
                </div>
                <h3 style="margin-top: 20px;">Grade 6</h3>
                <div class="fileD" v-for="(file, index) in sortgrade6()" :key="index" @click="selectFile(file._id,file.title)">
                    <h4>{{ file.title }}</h4>
                    <!-- <p>{{ file.summary }}</p> -->
                </div>
            </div>
            
        </div>
    </div>
    <div class="file-cluster" v-if="editcluster">
        <div class="edit-b">
            <h1>Edit</h1>
            <textarea  class="q-input" id="" placeholder="Story (Option)" v-model="questions[editindex].story"></textarea>

                    <textarea  class="q-input" id="" placeholder="Question.." v-model="questions[editindex].question"></textarea>
                    
                    <br>
                    <select class="t-o-q" v-if="questions[editindex]?.type == 'true-false'" v-model="questions[editindex].answer"  >
                        <option disabled value="">-- Select a type --</option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                        
                    </select>
                    <div class="multi" v-else-if="questions[editindex]?.type ==='multiple-choice'">
                        <input class="input-c" type="text" v-model="questions[editindex].options[0]" placeholder="choices...">
                        <input class="input-c" type="text" v-model="questions[editindex].options[1]" placeholder="choices...">
                        <input class="input-c" type="text" v-model="questions[editindex].options[2]" placeholder="choices...">
                        <input class="input-c" type="text" v-model="questions[editindex].options[3]" placeholder="choices...">

                        <div class="con-type">
                            <label class="labelQ" for="answer-type">Answer : </label>
                            <select class="t-o-q" v-model="questions[editindex].answer"  >

                                <option disabled value="">-- Select a Answer --</option>
                                <option v-for="Choice in questions[editindex].options.filter(choice => choice.trim() !== '')" :key="Choice" :value="Choice" @click="" >{{ Choice }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="con-type" v-else>
                        <label class="labelQ" for="answer-type">Answer : </label>
                        <input type="text" class="input-a" placeholder="Answer.." v-model="questions[editindex].answer">
                    </div>
                    <button class="btn-add" @click="saveEdit()">Save</button>
              
         
        </div>
    </div>
    <div class="file-cluster" v-if="deletecluster">
        <div class="edit-b">
            <h1>Delete</h1>
            <h3>Are you sure you want to delete Question {{ deleteIndex+1 }} ?</h3>
            <div class="btn-con">
                <button class="cancel-btn" @click="deletecluster = false;">Cancel</button>
                <button class="delete-btn" @click="removeItem(deleteIndex)">Delete</button>
            </div>
            
        </div>
    </div>
    <greenbg></greenbg>
    <main>
        <button class="btn-back" v-on:click="backBtn()">Back</button>
        <div class="con-q">
            <!-- <nav>
                <ul>
                    <li><button class="nav-btn" @click="navClick('Settings')" :class="btnActive.setting? 'activeBtn' : 'not-active'">Settings</button></li>
                    <li><button class="nav-btn" @click="navClick('Question')" :class="btnActive.Question? 'activeBtn' : 'not-active'" >Question</button></li>
                    <li><button class="nav-btn" @click="navClick('file')" :class="btnActive.file? 'activeBtn' : 'not-active'">Upload file</button></li>
                </ul>
            </nav> -->
            <div class="con-settings" v-if="btnActive.setting">
                <!-- <label for="">Time</label> -->
                <!-- <input type="text" placeholder="Passing Score" class="input-a"> -->
            </div>
            <div class="con-Questions" v-if="btnActive.Question">
                <div class="header-con">
                    <p>Quiz Type:</p>
                    <select name="" id="" v-model="questionOption" >
                        <option value="Generate">Generate</option>
                        <option value="Costumize">Customize</option>
                    </select>
                </div>
                <div>
                    <label for="time" class="labelQ">Time per question :</label>
                    <input type="number" name="time" placeholder="minutes" class="input-a" style="max-width: 100px; margin: 10px; text-align: center;" v-model="time.minutes">
                    <input type="number" name="time" placeholder="seconds" class="input-a" style="max-width: 100px; margin: 10px; text-align: center;" v-model="time.seconds">

                </div>
                


                
                    <div class="upload" v-if="!uploading">
                        <div class="con-generate" v-if="questionOption === 'Generate'">
                            <header class="top-bar">
                            
                                <h1 class="title">⚡ Powered by GPT-5</h1>
                                <p class="text-xs text-gray-500 mt-2 italic">
                                    ⚠️ This AI is specialized in <span class="font-semibold">Mathematics</span>.
                                </p>
                            </header>
                            <div
                                v-if="isDragging && !generatingLoading"
                                class="drop-area"
                                @dragover.prevent
                                @dragleave.prevent="isDragging = false"
                                @drop.prevent="handleDrop"
                            >
                                <p>Drop your PDF here</p>
                            </div>
                            
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
                                <button class="file-c" @click="openClusterFile()"><font-awesome-icon icon="fa-solid fa-file" />Select Existing</button>
                            </div>
                            <p v-if="progress > 0 && progress !== 100" class="progress-text">
                        Progress: {{ progress }}%
                    </p>
                            <div class="Question-options" v-if="fileId && !isDragging && !generatingLoading">
                                <h4>File Selected: {{ filetitle }}</h4>
                                <div>
                                    <label for="numQuestions">Number of Questions</label>
                                    <input class="num-in" type="number" id="numQuestions" placeholder="Number of Questions" v-model="uploadGenerate.num_questions">
                                </div>
                                
                                    <select class="t-o-q" v-model="uploadGenerate.type"  >
                                        <option disabled value="">-- Select a type --</option>
                                        <option value="multiple-choice">Multiple Choice</option>
                                        <option value="short-answer">Identification</option>
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
                    



                    <!-- <input type="file" @change="onFileChange" />
                    <button @click="uploadLesson">Upload</button>
                    <p v-if="progress">Progress: {{ progress }}%</p> -->
                    
                    
                    <div class="loading-generate" v-if="generatingLoading">
                        <div class="loading-r"></div>
                        <p class="typing">Generating questions...</p>
                    </div>
                </div>
                <div class="loading-generate" v-if="uploading">
                    
                        <div class="loading-r"></div>
                        <p class="typing">Analyzing document…</p>
                    </div>
                <div v-if="questionOption === 'Costumize'" class="Costumize">
                    <textarea  class="q-input" id="" placeholder="Story (Option)" v-model="CostumeQuestion.story"></textarea>

                    <textarea  class="q-input" id="" placeholder="Question.." v-model="CostumeQuestion.Q"></textarea>
                    <div class="con-type">
                        <label class="labelQ" for="question-type">Question Type : </label>
                        <select name="question-type" class="t-o-q" v-model="CostumeQuestion.type"  >
                            <option disabled value="">-- Select a type --</option>
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="input answer">input answer</option>
                            <option value="true-false">true-false</option>
                        </select>
                    </div>
                    
                    <br>
                    <div class="con-type"v-if="CostumeQuestion.type == 'true-false'">
                        <label class="labelQ" for="answer-type">Answer : </label>
                        <select name="answer-type" class="t-o-q" v-if="CostumeQuestion.type == 'true-false'" v-model="CostumeQuestion.answer"  >
                            <option disabled value="">-- Select a type --</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                            
                        </select>
                    </div>
                    
                    <div class="multi" v-if="CostumeQuestion.type === 'multiple-choice'">
                        <input class="input-c" type="text" v-model="CostumeQuestion.options[0]" placeholder="choices...">
                        <input class="input-c" type="text" v-model="CostumeQuestion.options[1]" placeholder="choices...">
                        <input class="input-c" type="text" v-model="CostumeQuestion.options[2]" placeholder="choices...">
                        <input class="input-c" type="text" v-model="CostumeQuestion.options[3]" placeholder="choices...">

                        <div class="con-type">
                            <label class="labelQ" for="answer-type">Answer : </label>
                            <select name="answer-type" class="t-o-q" v-model="CostumeQuestion.answer"  >
                                <option disabled value="">-- Select a Answer --</option>
                                <option v-for="Choice in CostumeQuestion?.options.filter(choice => choice.trim() !== '')" :key="Choice" :value="Choice" @click="" >{{ Choice }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="con-input-a" v-else-if="CostumeQuestion.type==='input answer'">
                        <input type="text" class="input-a" placeholder="Answer.." v-model="CostumeQuestion.answer">
                    </div>
                    <button class="btn-add" @click="addQuestion()">Add..</button>
                </div>
                
            </div>
            <div class="con-file" v-if="btnActive.file">
                
                    
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
                    {{ player.player }}
                </div>
            </div>
            
        </div>
        <div v-if="btnLobby.Question" class="con-qs">
            <h3>Questions : {{ questions.length }}</h3>
            <div class="question" v-for="(question,index) in questions" :key="index" :id="index">
                <h4>No.{{ index + 1 }}</h4>
                <!-- TODO: fix the data -->
                <p class="type">{{ question?.topic }}</p>
                <p class="type">{{ question?.type }}</p>
                
                
                <!-- <p class="type">{{ question.language }}</p> -->
                <!-- Render ASCII table safely -->

                <!-- //create the table here -->
                 <!-- Dynamic Table -->
                  {{ question?.tabletype }}
                  <div class="bar-chart" v-if="question?.tabletype == 'Line'">
                    <apexChart
                        type="line"
                        height="230"
                        :series="question.table.LineChart.series"
                        :options="question.table.LineChart.options"
                    />
                  </div>
                  <div v-if="question?.tabletype == 'Bar'" class="bar-chart">
                    <apexChart
                        type="bar"
                        height="230"
                       
                        :series="question.table.BarChart.series"
                        :options="question.table.BarChart.options"
                        
                    />
                    
                  </div>
                  <div v-if="question?.tabletype == 'Pie'">
                    <apexChart
                        type="pie"
                        height="200"
                        :series="question?.table.PieChart.series"
                        :options="question?.table.PieChart.options"
                        />
                  </div>
                 <div v-if="question?.tabletype == 'Table'">
                    <table v-if="question?.table" class="custom-table">
                        <thead>
                        <tr>
                            <th v-for="(header, hIndex) in question.table.head" :key="hIndex">
                            {{ header }}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(row, rIndex) in question.table.body" :key="rIndex">
                            <td v-for="(cell, cIndex) in row" :key="cIndex">
                            {{ cell }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table v-if="question?.table.Table" class="custom-table">
                        <thead>
                        <tr>
                            <th v-for="(header, hIndex) in question.table.Table.head" :key="hIndex">
                            {{ header }}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(row, rIndex) in question.table.Table.body" :key="rIndex">
                            <td v-for="(cell, cIndex) in row" :key="cIndex">
                            {{ cell }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                 </div>
                
                <p v-if="question?.story">Story : {{ question?.story }}</p>
                <!-- <textarea class="question-t" name="" id="" v-model="question.story" :readonly="editindex == index"></textarea> -->
                <p>{{ question.question }}</p>
                <!-- <textarea class="question-t" name="" id="" v-model="question.question" :readonly="editindex == index"></textarea> -->
                <div class="multi" v-if="question?.type.trim() =='multiple-choice'">
                    <div class="choices" v-for="(Choice,index) in question.options" :key="index" :class="(Choice===question.answer)? 'r-answer':'w-answer'" >
                        {{ Choice }}
                        
                    </div>
                </div>
                <div class="true-false" v-else-if="question.type==='true-false'">
                    <div class="choices" :class="('true'===question.answer)? 'r-answer':'w-answer'" >True</div>
                    <div class="choices" :class="('false'===question.answer)? 'r-answer':'w-answer'" >False</div>
                </div>
                <div class="con-input-a" v-else>
                    <div class="input-answer" >
                      Answer: {{ question.answer }}
                <!-- <textarea class="question-t-a" name="" id="" v-model="question.answer" :readonly="editindex == index"></textarea> -->
                      
                    </div>
                </div>
                
                <p> Explanation : {{ question.explanation }}</p>
                <div class="action-con">
                    <button class="action" @click="editbtnq(index)"><font-awesome-icon icon="fa-solid fa-pen" size="xl" style="color: #ffd43b;" /></button>
                    <button class="action" @click="deleteON(index)"><font-awesome-icon icon="fa-solid fa-trash" size="xl" style="color: #cc0000;" /></button>
                </div>
            </div>
        </div>
      </div>
      <button @click="startGame()" class="btn-start">start</button>
    </main>
    
</template>
<script>
import greenbg from '@/views/student-ui/components/greenbg.vue';
import socket from '@/socket';
import api from '@/axios';
import ApexChart from "vue3-apexcharts"
export default{
    components: {
        ApexChart,
        greenbg
    },
    data(){
        return{
            deletecluster:false,
            editindex:null,
            isDragging: false,
            generateBtnSwitch: false,
            generateBtn:'Generate',
            uploadGenerate:{num_questions:null,type:'',topic:'',lang:'',difficulty:''},
            progress : 0,
            file : null,
            btnActive:{setting:false,Question:true,file:false},
            btnLobby:{playes:false,Question:true},
            questionOption:'Costumize',

            players : [].sort((a, b) => a.name.localeCompare(b.name)),
            
            questionGenerateSetting:{type:'',topic:'',lang:'',difficulty:''},

            questions:[],
            fileId: '',
            CostumeQuestion:{Q:'',type:'',answer:'',answerType:'',options:[],story:''},
            id: this.$route.query.i,
            filelist: [],
            fileCluster:false,
            generatingLoading: false, // <- add this
            fileloading: false,
            filetitle:'',
            time:{minutes:0,seconds:0},
            uploading:false,
            edit:{option:[],question:'',story:'',answer:''},
            editcluster:false,
            deleteIndex:null,
            uploadedLessons:[],
        }
    },
    methods:{
        sortgrade5(){
            const Array = this.uploadedLessons.filter(lesson => lesson.gradeLevel === 'Grade 5');
            return Array;
        },
        sortgrade6(){
            const Array = this.uploadedLessons.filter(lesson => lesson.gradeLevel === 'Grade 6');
            return Array;
        },
        deleteON(index){
            this.deleteIndex = index;
            this.deletecluster = true;
        },
        removeItem(index) {
            this.questions.splice(this.deleteIndex, 1); 
            this.deletecluster = false;

        },
        saveEdit(){
            this.editcluster = false;

        },
        editbtnq(index){
            this.editcluster = true;
            this.editindex = index ;
        },
        startGame(){
            if(!this.time.minutes && !this.time.seconds){
                if(this.time.seconds < 0){
                    alert('⚠️ Time per question cannot be negative.');
                    return;
                }else if(this.time.seconds > 300){
                    alert('⚠️ Time per question is too long. Please set a time less than 5 minutes.');
                    return;
                }
                alert('⚠️ Time limit not set. Please configure a timer before starting.');
                return;
            }
            if(this.questions.length == 0){
                alert('⚠️ No questions available. Please add questions before starting.');
                return;
            }
            if(this.players.length == 0){
                alert('⚠️ No players joined yet. Waiting for players...');
                return;
            }
            socket.emit('game-start',{roomId:this.id,questions:this.questions,time:this.time});
            this.$router.push({name:'leaderboard',query: { i: this.id }});
        },
        selectFile(file,title) {
            this.filetitle = title;
            this.fileCluster = false;
            this.fileId = file;
        },
        async openClusterFile(){
            this.fileCluster = true;
            this.fileloading = true;
            this.filelist = [];
            try {
                const res = await api.get('/lesson/list');
                this.filelist = res.data.files;
                // this.uploadedLessonsList();
                this.fileloading = false;
              
                // alert(res.data.message);
            } catch (err) {
                console.error("❌ Error fetching file list:", err);
                alert("Failed to load files. Please try again later.");
                this.fileloading = false;
            }
            this.fileloading = false;
        },
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
        this.uploading = true;
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
            
            this.fileId = res.data.id;
            this.filetitle = res.data.title;
            
            } catch (err) {
            console.error("❌ Upload failed:", err);
            alert(err.response?.data?.message || "Something went wrong during upload.");
            }
            this.uploading = false;

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
            if(this.CostumeQuestion.type === 'input answer'){
                this.CostumeQuestion.options=[];
            }
            this.questions.push({
                question: this.CostumeQuestion.Q,
                type: this.CostumeQuestion.type,
                answerType: '',
                story:this.CostumeQuestion.story,
                answer: this.CostumeQuestion.answer,
                options: this.CostumeQuestion.options.filter(choice => choice.trim() !== '')
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
                options: []
            };
        },
        async generateQuestion(){
            try{
                if(!this.fileId || !this.uploadGenerate.num_questions || !this.uploadGenerate.lang || !this.uploadGenerate.difficulty || !this.uploadGenerate.type){
                    alert('Please fill in all fields');
                    return;
                }
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
                console.log(res.data.quiz);
                res.data.quiz.forEach(q => {
                    this.questions.push(q);
                });
                this.$nextTick(() => {
                    const index = this.questions.length - 1;
                    const el = document.getElementById(index.toString());
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                });
                
               
            }catch(err){
                alert('Something went wrong, try again');
                console.log(err);
            }
            // alert('click!')
            this.generatingLoading = false;
            this.generateBtnSwitch = false;
            this.generateBtn = 'Generate';
        },
        async getmodedata(){
            try {
                const res = await api.get(`/get/mode/data`,{params: { id: this.id } });
            
                
                this.players = res.data.modeData || [];
            } catch (err) {
                console.error('Error fetching mode data:', err);
            }
        },
        async uploadedLessonsList(){
            try{
                const res = await api.get('/dlesson/list');
                this.uploadedLessons = res.data;
                console.log(this.uploadedLessons);
            }catch(err){
                console.log(err);
            }
        },

    },
    mounted(){
        this.getmodedata();
        socket.connect();
        socket.removeAllListeners();


        socket.emit('create-room', { roomId: this.id });
        socket.on('room-created', (data) => {
            // console.log('Room created:', data);
            // alert('Room created successfully! '+data.message);
            // Handle room creation confirmation here
        });
        socket.on('player-joined', (data) => {
            console.log('Player joined:', data);
            this.players.push({ player: data.player, lrn: data.lrn, profile: data.profile });
        });
        // console.log(socket.listeners('room-created').length);

        window.addEventListener("dragover", this.onDragOver);
        window.addEventListener("dragleave", this.onDragLeave);
        window.addEventListener("drop", this.onDropAnywhere);
        this.uploadedLessonsList();

    },
    beforeUnmount() {
    window.removeEventListener("dragover", this.onDragOver);
    window.removeEventListener("dragleave", this.onDragLeave);
    window.removeEventListener("drop", this.onDropAnywhere);
  },
}
</script>
<style scoped>
.header-con p{
    color: white;
    font-weight: 600;
}
.header-con{
    display: flex;
    align-items: center;
    gap: 1em;
}
select{
    text-align: center;
}
.con-type{
    display: flex;
    align-items: center;
    gap: 1em;
    margin-top: 10px;
}
.labelQ{
    color: white;
    font-weight: 600;
}
.btn-con{
    display: flex;
    gap: 1em;
}
.btn-con .cancel-btn{
    font-weight: 700;
    height: 40px;
    width: 70px;
    color: white;
    background-color: #f5dd05;
    border: none;
    border-radius: 6px;
}
.btn-con .delete-btn{
    font-weight: 700;
    height: 40px;
    width: 70px;
    background-color: #f58282;
    color: white;
    border: none;
    border-radius: 6px;
}
.action{
    background-color: #a7ddea;
    border: none;
    transition: 0.3s;
    border-radius: 5px;
    padding: 3px;
}
.action:hover{
    transform: scale(1.03);
    transition: 0.3s;
    background-color: #81e4fd;
}
.action-con{
    display: flex;
    gap: 1em;
}
.edit-b h3{
    color: white;
}
.true-false{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
}
.edit-b button{
    margin-top: 10px;
}
.edit-b textarea{
    margin-bottom: 10px;
}
.edit-b h1{
    color: white;
}
.edit-b{
    background-color: #a7ddea;
    width: 500px;
    height: fit-content;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.upload{
    width: 80%;
}
.question-t-a {
    color: white;
    background-color: #54de63;
    outline: none;
    resize: none;
    border: none;
    width: 100%;
    height: 60px;
    font-size: 20px;
    border-radius: 0 10px 10px 0;
    padding-top: 18px;        /* manual vertical centering */
    box-sizing: border-box;   /* ensures padding doesn’t overflow */
    line-height: 1.2;         /* tweak line height for better balance */
}

.question-t{
    color: #41b8d5;

    outline: none;
    resize: none;
    border: none;
    width: 100%;
    height: fit-content;
    font-size: 20px;
}
.close-btn{
    justify-self: end;
    align-self: flex-end;
    left: auto;
    background-color: transparent;
    border: none;
}
.bar-chart{
    width: 100%;
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.95rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.custom-table th {
  background: #3f51b5;
  color: white;
  padding: 10px;
  text-align: left;
}

.custom-table td {
  padding: 10px;
  border-top: 1px solid #ddd;
}

.custom-table tr:nth-child(even) {
  background: #f9f9f9;
}

.loading{
    border: 4px solid rgba(0, 0, 0, 0.1); /* light gray background */
    border-top-color: #2563eb;             /* colored part of spinner */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: auto;
}
.loading-con{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
}
.file-cluster{
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgb(2, 2, 2,0.5);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.file-list{
    width: 30%;
    height: fit-content;
    max-height: 80%;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
}
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
    color: white;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
}
.drop-area {
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
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
.top-bar h1,.top-bar p {
    margin: 0;
}
.top-bar p{
    font-size: 0.55rem;
    /* color: #6b7280; */
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
  display: flex;
  flex-direction: column;
}
.logo {
  width: 20px;
  height: auto;
}
.title {
  font-size: 0.8rem;
  font-weight: bold;
  color: #111827;
  display: flex;
  flex-direction: column;
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
.file-in{
    scrollbar-width: none;
    /* background-color: #0056b3; */
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    overflow-y: auto;
    max-height: 400px; /* Limit height to prevent overflow */
}
/* .file-l:hover{
    z-index: 10;
    max-height: max-content;
    overflow: visible;
} */
 .fileD{
    background-color: #f58282;
    transition: 0.3s;

    height: 150px;
    color: white;
    /* overflow: hidden; */
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
 }
  .fileD:hover{
    transition: 0.3s;
    background-color: #d16e6e;

    /* background-color: #69b1ff; */
 }
 .file-l:hover{
    transition: 0.3s;
    background-color: #69b1ff;
 }
.file-l{
    /* width: 100%; */
    transition: 0.3s;

    height: 150px;
    color: white;
    /* overflow: hidden; */
    padding: 10px;
    border-radius: 10px;
    background-color: #7bbbff;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
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
  /* border: 1px solid #2563eb;    Optional styling */
  border: none;
  border-radius: 6px;
  /* background-color: #2563eb; */
  color: white;
  cursor: pointer;
  gap: 8px;                      /* Space between icon and text */
  transition: background-color 0.2s;
}
.file-c{
    background-color: #ffeb3b;
}
.file-label{
    background-color: #2563eb;    /* Blue background */
}
.file-c:hover{
    background-color: #f3ff83;
    
}
.file-label:hover {
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
    background-color:#4CAF50 ;
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
    background-color: #4CAF50;
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
    background-color: #4CAF50;
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
    background-color: #65b4d1;
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
.num-in{
    border: #54de63 solid;
    font-size: 15px;
    border-radius: 10px;
    height: 40px;
    width: 50%;
}
.num-in:focus{
    outline: none;
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
    align-items: center;
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
    background-color: #4CAF50;
}
option{
    background-color: rgb(146, 204, 159);
    outline: none;
    border: none;
}
.con-settings,
.con-Questions,
.con-file{

    min-height: 80%;

    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */

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
/* main::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/bg.png'); 
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  z-index: -1;
} */
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
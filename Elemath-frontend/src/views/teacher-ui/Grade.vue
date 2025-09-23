<template>
    <div class="cluster-con" v-if="clusterCreateGrade === true">
        <div class="cluster">
            <div class="header-cluster">
                <button @click="clusterCreateGrade = false"><font-awesome-icon :icon="['fas', 'xmark']" size="lg"/></button>
                <h1>Create Quarter</h1>
                <h2>class : {{ selectedClassId?.Class_name }}</h2>
            </div>

            <input type="text" class="input-cluster" placeholder="Quarter Name" v-model="qname">
            <button class="btn-cluster" @click="createQuarter(selectedClassId)">Create</button>
        </div>
    </div>
    <loading v-if="reload"></loading>
    <body v-else>
        <navbar></navbar>
        <main>
            <header>
                <h1>Grade Sheet</h1>
                <div class="actions">
                    <p class="tittle-btn">Class :</p>
                    <select
                        name="class"
                        class="selectClass"
                        v-model="selectedClassId"
                        @change="getClassData(selectedClassId)"
                        >
                        <option
                            v-for="classes in class"
                            :key="classes.Class_id"
                            :value="classes.Class_id"
                        >
                            {{ classes.Class_name }}
                        </option>
                    </select>
                    <p class="tittle-btn">Quarter :</p>
                    <select
                        name="class"
                        class="selectClass"
                        v-model="quarterSelected"
                        @change="getQuarter(quarterSelected)"
                        >
                        <option
                            v-for="classes in quaterlist"
                            :key="classes._id"
                            :value="classes._id"
                        >
                            {{ classes.gradingPeriod }}
                        </option>
                    </select>
                    
                    
                    <button class="btn" @click="clusterCreateGrade = true">Create an Quarter</button>
                    <!-- <button class="list-q"><font-awesome-icon icon="fa-solid fa-list" size="xl"/></button> -->
                </div>
                
            </header>
            <div class="table-con">
                <!-- TODO: create better table -->
                 <div class="head-table">
                    <div class="counter-con">
                        <p>No. of Quiz <span>{{counterQuizandWindowCard().quizCount }}</span></p>
                        <p>NO. of Window Card <span>{{ counterQuizandWindowCard().windowcardCount }}</span></p>
                    </div>
                    <div class="btn-table">
                        <button @click="moveless()"><font-awesome-icon icon="fa-solid fa-arrow-left" size="lg" /></button><button @click="movemore()"><font-awesome-icon icon="fa-solid fa-arrow-right" size="lg" /></button>
                    </div>
                 </div>
                 
                 <div class="table">
                    <div class="thead">
                        <div class="th-name" @click="add()"><h3>Name</h3></div>
                        <div class="th-con">
                            <!-- sadadads -->
                            <div class="th" v-for="(quiz, index) in mazLength(students[0]?.quiz)" :key="quiz.quizId">
                                <p v-if="quiz.mode === 'QUIZ MODE'">Quiz</p>
                                <p v-else-if="quiz.mode === 'WINDOWCARD MODE'">Window Card</p>

                            </div>
                        </div>
                        <div class="th-total"><p>Ave</p></div>
                    </div>
                    <div class="tbody">
                        <div class="tr" :id="index%2? 'line-2' : ''" v-for="(student,index) in students" :key="student.name">
                            <div class="td-name"><h5 class="student-name" >{{ student.name }}</h5></div>
                            <div class="td-con">
                                <div class="td" v-for="grades in mazLength(student?.quiz)" :key="grades.lrn" :class="passornot(grades.score,grades.total)? 'pass':'notpass'"><p>{{ grades.score }}/{{ grades.total }}</p> </div>
                            </div>
                            <div class="td-total" :class="average(student?.quiz).pass ? 'pass' : 'notpass'"><p>{{ average(student?.quiz).average % 1 === 0 ? average(student?.quiz).average.toFixed(0) : average(student?.quiz)?.average?.toFixed(2) }}</p></div>
                        </div>
                    </div>
                 </div>
            </div>
            
        </main>

    </body>
</template> 
<script>
import api from '@/axios';
import navbar from './components/navbar.vue';
import loading from './components/loading.vue';
export default{
    components:{
        navbar,
        loading                   
    },
    data(){
        return{
            reload: true,
            qname:'',
            clusterCreateGrade:false,
            user:null,
            class:null,
            classInput:'',
            selectedClassId:{},
            quaterlist:null,
            quarterSelected:null,
            quizs:[],
            // quizstotal: [10, 20, 25, 15, 30, 50, 40, 35, 45, 60],
            students: [],       // list of students in the class
            dataset: [],

            line:0,
            quizCount1:0,
            windowcardCount1:0,
        }
    },
    methods:{
        counterQuizandWindowCard(){
            let quizCount = 0;
            let windowcardCount = 0;
            if(!this.students[0]?.quiz) return {quizCount,windowcardCount};
            for(let quiz of this.students[0]?.quiz){
                if(quiz.mode === 'QUIZ MODE'){
                    quizCount++;
                }else if(quiz.mode === 'WINDOWCARD MODE'){
                    windowcardCount++;
                }
            }
            return {quizCount,windowcardCount};
        },
        movemore(){
            if(this.line < (this.students[0].quiz.length - 5)){
                 
                this.line++;
            }
            // console.log('line : '+this.line +' quiz : '+(this.students[0].quiz.length - 5));
        },
        moveless(){
            if(this.line > 0){
                 
                this.line--;
            }
            // console.log('line : '+this.line +' quiz : '+(this.students[0].quiz.length - 5));
        },
        mazLength(quiz){
            let list = [];
            for (let i = this.line; i < this.line + 5 && i < quiz?.length; i++){

                    list.push(quiz[i]);
                    // console.log('lpp[]');
                
            }
            // console.log('length : '+list.length +' quiz : '+quiz.length);
            return list;
        },
        passornot(grade,total){
            const ave = grade / total * 100;
            if(ave >= 75) return true;
            return false;
        },
        async refreshtoken(){
            try {
                const res = await api.post('/refresh-token');
                this.user = res.data;
                // console.log('Token refreshed successfully:', res.data);
                await this.getData();
            } catch (err) {
                console.error('Error refreshing token:', err);
                if(err.response && err.response.status === 401) {
                    this.$router.push('/');
                } else {
                    alert('Failed to refresh token. Please try again later.');
                }
            }
        },
        //TODO:fix this and add an drop down
        async createQuarter(classId) {
            console.log('ClassId:', classId, 'Quarter:', this.qname);

            try {
                const res = await api.post('/create/record', {
                classId,
                gradingPeriod: this.qname
                });

                // log success clearly
                console.log('✅ Gradebook Created:', res.data.message);

                // optional: show feedback in the UI
                // this.$toast.success(`Gradebook created for ${this.qname}!`);

                // optional: store result in a local state
                this.gradebook = res.data.result;
                await this.getAllQuarter(classId);
                this.clusterCreateGrade = false;
            } catch (err) {
                // Better error handling
                if(err.response.status === 400){
                    alert(err.response.data.message);
                }
                if (err.response) {
                console.error('❌ API Error:', err.response.data.message);
                // this.$toast.error(err.response.data.message || 'Failed to create gradebook.');
                } else {
                console.error('❌ Network Error:', err.message);
                // this.$toast.error('Server unreachable. Please try again.');
                }

                
            }
        },
        async getAllQuarter(classId){
            try{
                const res = await api.post('/get/classrecord/Id',{
                    classId:classId
                });
                const data = res.data.records;
                this.quaterlist =data;
                if(this.quaterlist.length <=0){
                    alert('Need to create an Quarter.');
                    this.clusterCreateGrade=true;
                    return;
                }
                this.quarterSelected = data[0]._id;
                this.getQuarter(data[0]._id);
                // console.log('res get all record id '+ JSON.stringify(data));
            }catch(err){
                console.log(err);
            }
        },

        async getQuarter(quaterId) {
            try {
                const res = await api.post('/get/quarter', {
                    quaterId: quaterId
                });
                if(res.data.students.length == 0) return;
                if (res.data && Array.isArray(res.data.students) ) {
                    // Sort students alphabetically by name
                    this.students = res.data.students.sort((a, b) => 
                        a.name.localeCompare(b.name)
                    );
                    // console.log('quiz' + this.students[0]?.quiz.length);
                    this.line = this.students[0].quiz.length > 7 ? 0 : this.line;
                    // console.log('sasdas'+JSON.stringify( this.students));
                } else {
                    console.warn("No students found in response:", res.data);
                    
                }

                // console.log("Sorted students:", this.students);
            } catch (err) {
                console.error("Error fetching quarter:", err);
            }
        },

        async getClassData(classIn) {
            try {
            // console.log('class id : ' + classIn);
            const res = await api.post('/get/classData', { classId: classIn });

            if (res.data.length <= 0) {
                alert('No student in this class yet!');
                this.$router.push({ name: 'createClass', query: { i: classIn } });
                return;
            }

            // Sort students by name
            // this.students = res.data.sort((a, b) => a.name.localeCompare(b.name));
            this.students = this.students.sort((a, b) => {
                        const nameA = a.name || '';
                        const nameB = b.name || '';
                        return nameA.localeCompare(nameB);
                    });
            this.reload = false;

            // After fetching students, get their quiz data
            await this.getAllQuarter(classIn);

            // // Build dataset
            // this.dataset = this.students.map(student => {
            //     // Find all quiz scores for this student
            //     const quizScores = this.quizs.flatMap(quiz => {
            //     const matched = quiz.students.find(s => s.lrn === student.lrn);
            //     if (matched) {
            //         return [{
            //         quizId: quiz.quizId,
            //         quizName: quiz.quizname,
            //         score: matched.score
            //         }];
            //     }
            //     return [];
            //     });

            //     return {
            //     lrn: student.lrn,
            //     name: student.name,
            //     quizs: quizScores
            //     };
            // });

            // console.log('Structured dataset:', this.dataset);

            } catch (err) {
            console.error('Error fetching class data:', err);
            alert('Failed to load class data. Please try again later.');
            }
        },
        async getData() {
            try {
                const res = await api.get('/get/grade/class');
                this.class = res.data.data;

                if (this.class && this.class.length > 0) {
                    const firstClass = this.class[0];
                    this.selectedClassId = firstClass.Class_id;
                    this.classInput = firstClass;
                    this.getClassData(this.selectedClassId);
                }else{
                    alert('No class yet!');
                    this.$router.push('/tc');
                }


                // console.log('Data fetched successfully:', res.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                
                if (err.response?.status === 401) {
                    this.$router.push('/');
                } else {
                    const msg = err.response?.data?.message || 'Failed to fetch data. Please try again later.';
                    alert(msg);
                }
            }
        },
        gradeline(grades,quizstotal){

            if (!Array.isArray(grades) || !Array.isArray(quizstotal)) {
                console.warn("gradeline called with invalid data");
                return [];
            }
            const list = [];
            let i = this.line;
            for( i ; i < this.line + 7 && i < grades.length; i++){
                let pass = false;
                if (grades[i] < (quizstotal[i] * 0.75)){
                    pass = true;
                }
                list.push({grade:grades[i],pass:pass});
            }

            return list;
        },
        add(){
            if(this.line < (this.students[0].quiz.length - 7)){
                 
                this.line++;
            }
            // console.log('line : '+this.line +' Student : '+(this.students[0].quiz.length - 4));
            
        },
        quizslist(quiz,quizstotal){
            const list = [];
            let i = this.line;
            for( i ; i < this.line + 7 && i < quiz.length; i++){
                list.push({name : quiz[i],score : quizstotal[i]});
            }
            // console.log('line : '+i +' Student : '+(quiz.length-7));
            return list;
        },
        average(grades){
            let average = null;
            if(!grades) return average = 'Na'
            let pass = false;
            // let average = 100;//(Total / grades.length).toFixed(2);
            // if(this.quizs){
            //     average='Na';
            // }
            let Total = 0;
            for(let i in grades){
                Total += (grades[i].score / grades[i].total) ;
                // console.log(`score : ${grades[i].score} , total : ${grades[i].total} , average : ${grades[i].score/grades[i].total}` );
            }
             
            
            if((Total / grades.length)>75){
                pass = true
            }
            average = (Total/grades.length)*100;
            //  console.log('grade : '+JSON.stringify(grades));
            return {average,pass};
           
        }
    },
    mounted(){
        this.refreshtoken();
        // console.log(students[0]?.quiz.length);
        // alert(students[0]?.quiz.length);
        // this.getData();
    }
}
</script>
<style scoped>
.counter-con{
    display: flex;
    gap: 20px;
    margin-left: 10px;
}
.counter-con p span {
    padding: 0% 5px;
    color: #41b8d5;
    background-color: white;
    font-weight: 800;
}
.counter-con p{
    color: #4fc4f7;
    font-weight: 800;
}
.head-table{
    width: 94%;
    height: 40px;
    display: flex;
    justify-content: space-between;
}
.tittle-btn{
    font-weight: 600;
    margin-left: 0;
    padding: 0;
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.btn{
    border: none;
    background-color: #4fc4f7;
    color: white;
    font-weight: 800;
    height: 50px;
    border-radius: 5px;
    padding: 10px;
}
.selectClass{
    border-radius: 5px;
    margin-right: 10px;
    height: 50px;
    width: 100px;
    padding: 10px;
    color: #4fc4f7;
    font-weight: 800;
    border: none;
}
.selectClass:hover{
    width: fit-content;
    min-width: 100px;
}
.selectClass:focus{
    outline: none;
}
.student-name{
    margin: 0;
    padding: 0;
    margin-left: 10px;
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.cluster .btn-cluster{
    background-color: rgb(114, 241, 131);
    color: white;
    font-weight: 800;
    border: none;
}
.cluster .input-cluster{
    border: 2px solid rgb(114, 241, 131);
    /* border-bottom: 2px solid rgb(114, 241, 131); */
}
.cluster .input-cluster:focus{
    /* border: none; */
    outline: none;
    box-shadow: 0 0px 10 px rgb(114, 241, 131);
}
.cluster .input-cluster,.cluster .btn-cluster{
    width: 200px;
    height: 30px;
    margin-bottom: 10px;
    border-radius: 5px;
}
.header-cluster h2{
    margin: 0;
    margin-bottom: 20px;
}
.header-cluster h1{
    margin: 0;
}
.header-cluster button{

    align-self: flex-end;
    left: auto;
    border: none;
    color: rgb(245, 101, 101);
    background-color: transparent;
}
header h1{
    color: #41b8d5;
    margin-left: 19px;
}
.header-cluster{
    color: #41b8d5;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.cluster{
    height: fit-content;
    width: 300px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    /* justify-content: center; */
}
.cluster-con{
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
.actions{
    color: #4fc4f7;
    margin-left: 20px;
    display: flex;
    /* gap: 20px; */
}
#line-2{
    background-color: rgb(154, 209, 247);
}
.notpass{
    background-color: rgb(255, 140, 140);
}
body{
    background-color: rgb(235, 235, 235);
    height: 100vh;
    width: 100vw;
    display: flex;
    overflow: hidden;

}
.tbody{
    height: calc(100% - 50px);
    overflow: auto;
    scrollbar-width: none;
    width: 100%;
    /* background-color: aqua; */
}
.th-total{
    text-align: center;
    text-justify:auto;
    height: 50px;
    width: 60px;
    border: 1px solid rgb(117, 165, 255);
}
.td-total{
    font-weight: 800;
    align-self: end;
    left: auto;
    text-align: center;
    text-justify:auto;
    height: 25px;
    min-width: 60px;
    border: 1px solid rgb(117, 165, 255);
}
.td p,.td-total p{
    margin: 0;
}
.th{
    text-align: center;
    text-justify:auto;
    min-width: 50px;
    width: 100%;
    height: 50px;
    border: 1px solid black;
}
.td{
    text-align: center;
    text-justify:auto;
    min-width: 50px;
    width: 100%;
    height: 25px;
    border: 1px solid black;
}
.thead{
    background-color: #ccc;
    height: 50px;
}
.th-con{
    height: 50px;
    width:calc(100% - 350px);
    border: 1px solid black;
    display: flex;
}
.tr,.thead{display: flex;}
.td-con{
    display: flex;
    height: 25px;
    width:100%;
    border: 1px solid rgb(117, 165, 255);
}
.th-name h3{
    margin: 0;
    
}
.th-name{
    height: 50px;
    min-width: 300px;
    font-weight: 800;
    text-align: center;
    border: 1px solid black;
}
.td-name{
    overflow: hidden;
    height: 25px;
    min-width: 300px;
    font-weight: 800;
    text-align: start;
    border: 1px solid rgb(117, 165, 255);
}
th,td{
    outline: auto;
}
.btn-table{
    /* width: 94%;
    height: 40px; */
    display: flex;
    justify-content: end;
}
.table{
    
    border: 1px solid rgb(255, 255, 255);
    height: 80%;
    width: 94%;
    /* background-color: rgb(216, 216, 216); */
}
.table-con{
    /* background-color: aqua; */
    height: 85%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
main{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: center;
    justify-content: center; */
}
</style>
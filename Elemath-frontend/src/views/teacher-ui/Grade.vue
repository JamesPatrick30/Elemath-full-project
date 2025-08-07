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
    <body>
        <navbar></navbar>
        <main>
            <header>
                <h1>Grade</h1>
                <div class="actions">
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
                    
                    
                    <button @click="clusterCreateGrade = true">Create an Quarter</button>
                    <button class="list-q"><font-awesome-icon icon="fa-solid fa-list" size="xl"/></button>
                </div>
                
            </header>
            <div class="table-con">
                <!-- TODO: create better table -->
                 <div class="table">
                    <div class="thead">
                        <div class="th-name" @click="add()"><h3>Name</h3></div>
                        <div class="th-con">
                            <div class="th" v-for="quiz in  quizslist(this.quizs,quizstotal)" :key="quiz.name">{{ quiz.name }} <br> {{ quiz.score }}</div>
                        </div>
                        <div class="th-total"><p>Ave</p></div>
                    </div>
                    <div class="tbody">
                        <div class="tr" :id="index%2? 'line-2' : ''" v-for="(student,index) in students" :key="student.name">
                            <div class="td-name"><h5 class="student-name">{{ student.name }}</h5></div>
                            <div class="td-con">
                                <div class="td" v-for="grades in gradeline(student.quiz,quizstotal)" :key="grades.lrn" :class="grades.pass? 'notpass':'pass'"><p>{{ grades.grade }}</p> </div>
                            </div>
                            <div class="td-total" :class="average(student.quiz).pass ? 'pass' : 'notpass'"><p>{{ average(student.quiz).average }}</p></div>
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
export default{
    components:{
        navbar                   
    },
    data(){
        return{
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
            students: [].sort((a, b) => a.name.localeCompare(b.name)),

            line:0
        }
    },
    methods:{
        async refreshtoken(){
            try {
                const res = await api.post('/refresh-token');
                this.user = res.data;
                console.log('Token refreshed successfully:', res.data);
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

        async getQuarter(quaterId){
            try{
                const res = await api.post('/get/quarter',{
                    quaterId:quaterId
                });
                this.quizs = res.data.quizzes;
                // console.log(res.data.quizzes);
            }catch(err){
                console.log(err);
            }
        },
        async getClassData(classIn) {
            try {
                console.log('class id : '+classIn);
                const res = await api.post('/get/classData', {
                    classId: classIn
                });

                console.log('Student list:', res.data.sort((a, b) => a.name.localeCompare(b.name)));
                this.getAllQuarter(classIn);
                this.students = res.data.sort((a, b) => a.name.localeCompare(b.name));
            } catch (err) {
                console.error('Error fetching class data:', err);
                alert('Failed to load class data. Please try again later.');
            }
        },
        async getData() {
            try {
                const res = await api.get('/get/grade/class');
                this.class = res.data.data;
                // console.log('classes ? '+JSON.stringify( this.class));
                // Automatically select the first class if available
                if (this.class && this.class.length > 0) {
                    const firstClass = this.class[0];
                    this.selectedClassId = firstClass.Class_id;
                    this.classInput = firstClass;
                    this.getClassData(this.selectedClassId);
                }else{
                    alert('No class yet!');
                    this.$router.push('/tc');
                }


                console.log('Data fetched successfully:', res.data);
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
            // const list = [];
            // let i = this.line;
            // for( i ; i < this.line + 7 && i < grades.length; i++){
            //     let pass = false;
            //     if (grades[i] < (quizstotal[i] * 0.75)){
            //         pass = true;
            //     }
            //     list.push({grade:grades[i],pass:pass});
            // }
            // console.log('line : '+list);
            // return list;
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
            console.log('line : '+i +' Student : '+(quiz.length-7));
            return list;
        },
        average(grades){
            let pass = false;
            let average = 100;//(Total / grades.length).toFixed(2);
            if(this.quizs){
                average='Na';
            }
            // let Total = 0;
            // for(let i in grades){
            //     Total += grades[i] / this.quizstotal[i] *100;
            // }
             
            
            // if((Total / grades.length)>75){
            //     pass = true
            // }
            return {average,pass};
        }
    },
    mounted(){
        this.refreshtoken()
        // this.getData();
    }
}
</script>
<style scoped>
.selectClass{
    border-radius: 5px;
    margin-left: 10px;
    height: 50px;
    width: 100px;
    padding: 10px;
    border: none;
}
.selectClass:focus{
    outline: none;
}
.student-name{
    margin: 0;
    padding: 0;
    
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
    margin-left: 20px;
    display: flex;
    gap: 20px;
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
    border: 1px solid black;
}
.td-total{
    text-align: center;
    text-justify:auto;
    height: 25px;
    width: 60px;
    border: 1px solid black;
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
    width:calc(100% - 350px);
    border: 1px solid black;
}
.th-name h3{
    margin: 0;
    
}
.th-name{
    height: 50px;
    width: 300px;
    font-weight: 800;
    text-align: center;
    border: 1px solid black;
}
.td-name{
    height: 25px;
    width: 300px;
    font-weight: 800;
    text-align: center;
    border: 1px solid black;
}
th,td{
    outline: auto;
}
.table{
    
    border: 1px solid black;
    height: 80%;
    width: 94%;
    /* background-color: rgb(216, 216, 216); */
}
.table-con{
    /* background-color: aqua; */
    height: 90%;
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
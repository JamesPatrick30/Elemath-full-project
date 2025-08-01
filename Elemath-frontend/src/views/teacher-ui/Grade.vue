<template>
    <div class="cluster-con" v-if="clusterCreateGrade === true">
        <div class="cluster">
            <div class="header-cluster">
                <button @click="clusterCreateGrade = false"><font-awesome-icon :icon="['fas', 'xmark']" size="lg"/></button>
                <h1>Create Quarter</h1>
                <h2>class : {{ selectedClassId?.Class_name }}</h2>
            </div>

            <input type="text" class="input-cluster" placeholder="Quarter Name" v-model="qname">
            <button class="btn-cluster" @click="createQuarter(selectedClassId?.Class_id)">Create</button>
        </div>
    </div>
    <body>
        <navbar></navbar>
        <main>
            <header>
                <h1>Grade</h1>
                <div class="actions">
                    <select name="class" id=""></select>
                    <select name="quater" id="">
                    
                    </select>
                    <button @click="clusterCreateGrade = true">Create an Quarter</button>
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
            classInput:'',
            selectedClassId:{},
            quizs:['Quiz 1','Quiz 2','Quiz 3','Quiz 4','Quiz 5','Quiz 6','Quiz 7','Quiz 8','Quiz 9','Quiz 10','Quiz 11'],
            quizstotal: [10, 20, 25, 15, 30, 50, 40, 35, 45, 60],
            students: [
            { lrn: 256548512374, name: 'Sanchez, James Patrick L.', quiz: [8, 15, 22, 12, 25, 41, 30, 28, 39, 55] },
            { lrn: 256548512375, name: 'Reyes, Maria Clara', quiz: [10, 18, 24, 13, 28, 48, 37, 33, 42, 59] },
            { lrn: 256548512376, name: 'Dela Cruz, Juan', quiz: [9, 16, 20, 14, 26, 44, 35, 30, 40, 57] },
            { lrn: 256548512377, name: 'Garcia, Ana', quiz: [7, 19, 23, 12, 29, 49, 39, 32, 44, 60] },
            { lrn: 256548512378, name: 'Torres, Miguel', quiz: [6, 11, 18, 10, 22, 38, 28, 25, 35, 50] },
            { lrn: 256548512379, name: 'Lopez, Carla', quiz: [9, 20, 25, 15, 30, 50, 40, 35, 45, 60] },
            { lrn: 256548512380, name: 'Ramos, Paolo', quiz: [8, 17, 22, 13, 27, 45, 36, 29, 41, 58] },
            { lrn: 256548512381, name: 'Cruz, Angelica', quiz: [10, 20, 25, 14, 30, 47, 39, 34, 43, 59] },
            { lrn: 256548512382, name: 'Santos, Mark', quiz: [7, 13, 19, 11, 23, 40, 31, 27, 38, 52] },
            { lrn: 256548512383, name: 'Flores, Bianca', quiz: [10, 19, 23, 15, 28, 46, 38, 33, 44, 60] },
            { lrn: 256548512384, name: 'Mendoza, Carlo', quiz: [8, 15, 21, 13, 25, 42, 34, 30, 40, 56] },
            { lrn: 256548512385, name: 'Gutierrez, Liza', quiz: [9, 18, 24, 14, 29, 48, 37, 32, 42, 58] },
            { lrn: 256548512386, name: 'Navarro, Kevin', quiz: [10, 17, 23, 12, 26, 47, 36, 31, 41, 57] },
            { lrn: 256548512387, name: 'Castro, Julia', quiz: [8, 14, 20, 11, 24, 43, 33, 28, 39, 54] },
            { lrn: 256548512388, name: 'Villanueva, Paolo', quiz: [9, 16, 21, 13, 27, 45, 35, 29, 41, 56] },
            { lrn: 256548512389, name: 'Morales, Erika', quiz: [10, 19, 25, 15, 30, 50, 40, 34, 45, 60] },
            { lrn: 256548512390, name: 'Fernandez, John', quiz: [7, 12, 18, 10, 22, 39, 30, 26, 36, 51] },
            { lrn: 256548512391, name: 'Diaz, Patricia', quiz: [10, 20, 25, 15, 30, 50, 40, 35, 45, 60] },
            { lrn: 256548512392, name: 'Bautista, Simon', quiz: [9, 18, 23, 14, 28, 47, 37, 32, 42, 59] },
            { lrn: 256548512393, name: 'Aguilar, Rose', quiz: [8, 16, 22, 13, 26, 46, 36, 31, 41, 57] }
            ].sort((a, b) => a.name.localeCompare(b.name)),

            line:0
        }
    },
    methods:{
        async createQuarter(classId){
            //TODO: create the logic
            console.log('Classid : '+classId );
        },
        async getQuarter(quaterId){
            try{
                const res = await api.post('/get/quarter',{
                    quaterId:quaterId
                });
            }catch(err){
                console.log(err);
            }
        },
        async getClassData(classIn) {
            try {
                const res = await api.post('/get/classData', {
                    classId: classIn
                });

                console.log('Student list:', res.data.sort((a, b) => a.name.localeCompare(b.name)));
                this.students = res.data.sort((a, b) => a.name.localeCompare(b.name));
            } catch (err) {
                console.error('Error fetching class data:', err);
                alert('Failed to load class data. Please try again later.');
            }
        },
        async getData() {
            try {
                const res = await api.get('/data/teacher');
                this.user = res.data;

                // Automatically select the first class if available
                if (this.user.class && this.user.class.length > 0) {
                    const firstClass = this.user.class[0];
                    this.selectedClassId = firstClass;
                    this.classInput = firstClass;
                    this.getClassData(this.selectedClassId.Class_id);
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
            // let Total = 0;
            // for(let i in grades){
            //     Total += grades[i] / this.quizstotal[i] *100;
            // }
             const average = 100;//(Total / grades.length).toFixed(2);
            let pass = false;
            // if((Total / grades.length)>75){
            //     pass = true
            // }
            return {average,pass};
        }
    },
    mounted(){
        this.getData();
    }
}
</script>
<style scoped>
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
<template>
    <body>
        <!-- <navbar /> -->
         <div class="add-student-con">
            <div class="form">
                <h5>ID : {{ classid }}</h5>

                <input type="text" placeholder="LRN" v-model="inputlrn" :class="warning? 'not-warning' : 'warning'">
                <input type="text" class="input" placeholder="First Name" v-model="firstName">
                <input type="text" class="input" placeholder="Middle Name" v-model="middleName">
                <input type="text" class="input" placeholder="Last Name" v-model="lastName">
                <button @click="enrollStudent()" class="btn-add"><font-awesome-icon :icon="['fas', 'user-plus']" /> ADD</button>
            </div>
         </div>
         <div class="list">
            <div class="list-con">
                <h3>Students : {{ students.length }}</h3>
                <div class="table">
                    <div class="table-head">
                        <div class="thead"><strong>Profile</strong></div>
                        <div class="thead"><strong>First Name</strong></div>
                        <div class="thead"><strong>Middle Name</strong></div>
                        <div class="thead"><strong>Last Name</strong></div>
                        <div class="thead"><strong>LRN</strong></div>
                        <div class="thead"><strong>Password</strong></div>
                        <div class="thead"><strong>Action</strong></div>

                    </div>
                    <div class="table-body">
                        <div class="tr-body" v-for="student in students" :key="student.lrn">
                            <div class="tbody" alt="Profile" ><img id="img":src="student.profile" alt="Profile"></div>
                                <div class="tbody"><p>{{student.firstname}}</p></div>
                                <div class="tbody"><p>{{ student.middlename }}.</p></div>
                                <div class="tbody"><p>{{student.lastname}}</p></div>
                                <div class="tbody"><p>{{student.lrn}}</p></div>
                                <div class="tbody"><p>{{student.password}}</p></div> 
                            <div class="tbody">
                                <button class="action-btn" id="edit-icon">
                                    <font-awesome-icon :icon="['fas', 'user-pen']"  style="color: yellow;" />
                                </button>
                                <button class="action-btn" id="trash-icon">
                                    <font-awesome-icon :icon="['fas', 'trash']" style="color: red;" />
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                <div class="footer">
                        <button @click="this.$router.push({name : 'teacher-ui'})"><font-awesome-icon icon="fa-regular fa-floppy-disk" /> Save</button>
                    </div>
            </div>
            
            

            
         </div>
    </body>
</template>
<script>
import navbar from './components/navbar.vue';
import api from '@/axios';
export default{
    name:'Create Class',
    components:{
        navbar
    },
    data(){
        return{
            classid:this.$route.query.i,
            students:[
                //{ firstName: "Juan", middleName: "Cruz", lastName: "Dela", lrn: "1000000001", password: "pass123", profile: "/characters/robot.png" },
                // { firstName: "Maria", middleName: "Lopez", lastName: "Santos", lrn: "1000000002", password: "pass124", profile: "/characters/berry.png" },
                // { firstName: "Jose", middleName: "Reyes", lastName: "Cruz", lrn: "1000000003", password: "pass125", profile: "/characters/blood.png" },
                // { firstName: "Ana", middleName: "Torres", lastName: "Garcia", lrn: "1000000004", password: "pass126", profile: "/characters/dragon.png" },
                // { firstName: "Mark", middleName: "Evans", lastName: "Dela Cruz", lrn: "1000000005", password: "pass127", profile: "/characters/Ele.png" },
                // { firstName: "Ella", middleName: "Mae", lastName: "Rivera", lrn: "1000000006", password: "pass128", profile: "/characters/froggy.png" },
                // { firstName: "Lucas", middleName: "John", lastName: "Fernandez", lrn: "1000000007", password: "pass129", profile: "/characters/green.png" },
                // { firstName: "Carla", middleName: "Jane", lastName: "Ramos", lrn: "1000000008", password: "pass130", profile: "/characters/grey.png" },
                // { firstName: "Miguel", middleName: "Andres", lastName: "Vega", lrn: "1000000009", password: "pass131", profile: "/characters/kiss.png" },
                // { firstName: "Nina", middleName: "Belle", lastName: "Luna", lrn: "1000000010", password: "pass132", profile: "/characters/lazy.png" },
                // { firstName: "Jude", middleName: "Matthew", lastName: "Ortiz", lrn: "1000000011", password: "pass133", profile: "/characters/longneck.png" },
                // { firstName: "Kyla", middleName: "Rose", lastName: "Santiago", lrn: "1000000012", password: "pass134", profile: "/characters/pickel.png" },
                // { firstName: "Leo", middleName: "Alexander", lastName: "Reyes", lrn: "1000000013", password: "pass135", profile: "/characters/rat.png" },
                // { firstName: "Grace", middleName: "Elaine", lastName: "Martinez", lrn: "1000000014", password: "pass136", profile: "/characters/slow.png" },
                // { firstName: "Jake", middleName: "Michael", lastName: "Domingo", lrn: "1000000015", password: "pass137", profile: "/characters/takos.png" },
                // { firstName: "Sofia", middleName: "Claire", lastName: "Tan", lrn: "1000000016", password: "pass138", profile: "/characters/think.png" },
                // { firstName: "Ivan", middleName: "James", lastName: "Navarro", lrn: "1000000017", password: "pass139", profile: "/characters/yellow.png" },
                // { firstName: "Lara", middleName: "Grace", lastName: "Castro", lrn: "1000000018", password: "pass140", profile: "/characters/blood.png" },
                // { firstName: "Enzo", middleName: "Rafael", lastName: "Solis", lrn: "1000000019", password: "pass141", profile: "/characters/dragon.png" },
                // { firstName: "Bianca", middleName: "Louise", lastName: "Gutierrez", lrn: "1000000020", password: "pass142", profile: "/characters/Ele.png" },
                // { firstName: "Darren", middleName: "Kyle", lastName: "Delos Reyes", lrn: "1000000021", password: "pass143", profile: "/characters/green.png" },
                // { firstName: "Chloe", middleName: "Ann", lastName: "Aguilar", lrn: "1000000022", password: "pass144", profile: "/characters/kiss.png" },
                // { firstName: "Caleb", middleName: "Renz", lastName: "Morales", lrn: "1000000023", password: "pass145", profile: "/characters/robot.png" },
                // { firstName: "Jasmine", middleName: "Ivy", lastName: "Torralba", lrn: "1000000024", password: "pass146", profile: "/characters/froggy.png" },
                // { firstName: "Tristan", middleName: "Paul", lastName: "Serrano", lrn: "1000000025", password: "pass147", profile: "/characters/rat.png" },
                // { firstName: "Andrea", middleName: "Nicole", lastName: "Villanueva", lrn: "1000000026", password: "pass148", profile: "/characters/longneck.png" },
                // { firstName: "Nathan", middleName: "Jay", lastName: "Bautista", lrn: "1000000027", password: "pass149", profile: "/characters/lazy.png" },
                // { firstName: "Camille", middleName: "Joy", lastName: "Rosario", lrn: "1000000028", password: "pass150", profile: "/characters/yellow.png" },
                // { firstName: "Adrian", middleName: "Lee", lastName: "Padilla", lrn: "1000000029", password: "pass151", profile: "/characters/grey.png" },
                // { firstName: "Faith", middleName: "Hope", lastName: "Quinto", lrn: "1000000030", password: "pass152", profile: "/characters/think.png" }
            ],
            inputlrn:'',
            firstName:'',
            middleName:'',
            lastName:'',
            warning:true,
            user:null
        }
    },
    methods:{
        async getClassData(classIn) {
            try {
                const res = await api.post('/get/classData', {
                    classId: classIn
                });

                console.log('Student list:', res.data);
                this.students = res.data;
            } catch (err) {
                console.error('Error fetching class data:', err);
                alert('Failed to load class data. Please try again later.');
            }
        },
        async enrollStudent(){
            if( !this.inputlrn || !this.firstName || !this.middleName || !this.lastName ){
                alert('Fill up the form')

            }
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
            const num = Math.floor(Math.random() * characters.length); // 1 to 100
            console.log('random : '+num + 'character : '+ characters[num]);
            try{
                const res = await api.post('/enroll-student',{
                    profile:characters[num],
                    fname:this.firstName,
                    mname:this.middleName,
                    lname:this.lastName,
                    lrn:this.inputlrn,
                    password:this.inputlrn,
                    classId:this.classid,
                    email:''
                });
                console.log(res.data);
            }catch(err){
                console.log(err);
                alert(err.response.data.message);
            }
        },
        async findStudent(){
            try{
                const res = await api.post('/find-student',{
                    lrn: this.inputlrn.trim()
                });
                console.log(res.data);
                this.firstName = res.data.firstName;
                this.middleName = res.data.middlename;
                this.lastName = res.data.lastName;
                this.warning=true;
            }catch(err){
                this.warning = false;
                console.log('error is :'+ err);
                if (err.response) {
                // Server responded with an error (like 400 or 404)
                alert(`${err.response.data.message}`);
                } else if (err.request) {
                // Request was made but no response
                alert('No response from server. Please check your connection.');
                } else {
                // Other errors (e.g., bad request config)
                alert('Something went wrong: ' + err.message);
                }
            }
        },
        async getData() {
            try {
                const res = await api.get('/data/teacher');
                this.user = res.data;
                console.log('Data fetched successfully:', res.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                if(err.response && err.response.status === 401) {
                    this.$router.push('/');
                } else {
                    alert('Failed to fetch data. Please try again later.');
                }
            }
        },
        async refreshtoken(){
            try {
                const res = await api.post('/refresh-token');
                this.user = res.data;
                console.log('Token refreshed successfully in class:', res.data);
                await this.getData();
                await this.getClassData(this.classid);
            } catch (err) {
                console.error('Error refreshing token:', err);
                if(err.response && err.response.status === 401) {
                    this.$router.push('/');
                } else {
                    alert('Failed to refresh token. Please try again later.');
                }
            }
        },
    },
   
    watch:{
        inputlrn(newVal) {
            if (newVal.trim().length === 12) {
            console.log(newVal);
            this.findStudent();
            // You can call other functions here too
            }
        }
    },

    mounted(){
        this.refreshtoken();
    }
    
}
</script>
<style scoped>
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.btn-add{
    border-radius: 5px;
    color: white;
    font-weight: 800;
    height: 40px;
    width: 100px;
    border: none;
    background-color: #4ff380;
}
.footer button{
    align-self: center;
    border: 1px solid #4fc4f7 ;
    background-color: white;
    width: 100px ;
    height: 30px;
    margin-right: 10px;
    border-radius: 5px;
}
.footer button:hover{
    background-color: #4fc4f7;
}
.footer{
    background-color: white;
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;

}
.list-con{
    border-radius: 10px;
    background-color: white;
    height: 90%;
    width: 95%;
}
.warning{
     margin-bottom: 10px;
    height: 40px;
    width: 80%;
    color: red;
    outline: none;
    border: none;
    border-bottom: 1px solid red;
}
.not-warning{
    margin-bottom: 10px;
    height: 40px;
    width: 80%;
    outline: none;
    border: none;
    border-bottom: 1px solid gray;
}
.form .input:focus{

    outline: none;
    border-bottom: 1px solid rgb(100, 193, 255);
    color: rgb(100, 193, 255);
}
.form .input{
    margin-bottom: 10px;
    height: 40px;
    width: 80%;
    outline: none;
    border: none;
    border-bottom: 1px solid gray;
}
.form{
    border-radius: 10px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 80%;
    width: 80%;
}
.action-btn{
    height: fit-content;
    width: fit-content;
    margin: 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}
/* .tr-body:hover {
  background-color: #299bff;
} */

.highlight-parent {
  background-color: #3a8bd1; /* light blue, change as needed */
  transition: background-color 0.2s ease;
}

#img{
    height: 50px;
    width: 50px;
    border-radius: 50%;
}
.table-body{
    overflow-y: scroll;
    scrollbar-width: none;
    background-color: white;
    height: inherit;
}
.tbody:has(.tbody:hover){
    background-color: aqua;
}
.table-head,.tr-body{
    
    display: flex;
    text-align: center;
}
.table-head{
    height: 50px;
    background-color: #ccc;
}
/* .tbody:hover{
    background-color: blue;
} */
.tbody{
    height: 55px;
    background-color: white;
}
.thead{
    background-color: #ccc;
}
.thead,.tbody{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    width: 100%;
    border-bottom: 1px solid rgb(141, 141, 141);
}
.table{
    overflow: hidden;
    
    height: 87%;
    width: 100%;
    background-color: white;
}
.table-con{
    height: 80%;
    width: 90%;
    border-radius: 20px;
    overflow: hidden;
    background-color: white;

}.table-container {
  max-height: 300px;
  overflow-y: auto;
  display: block;
}

.student-list-table {
  width: 100%;
  border-collapse: collapse;
}

.student-list-table th,
.student-list-table td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ccc;
}


.list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    
}
.add-student-con{
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
body{
    background-color: rgb(235, 235, 235);
    height: 100vh;
    width: 100vw;
    display: flex;
}
</style>
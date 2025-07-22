<template>
    <body>
        <!-- <navbar /> -->
         <div class="add-student-con">
            <div class="form">
                <h2 class="title">Add Student</h2>
                <h4 class="classname">Class Name : {{ classname }}</h4>
                <input type="text" placeholder="LRN" v-model="inputlrn" :class="warning? 'not-warning' : 'warning'">
                <input type="text" class="input" placeholder="First Name" v-model="firstName">
                <input type="text" class="input" placeholder="Middle Name" v-model="middleName">
                <input type="text" class="input" placeholder="Last Name" v-model="lastName">
                <button @click="enrollStudent()" class="btn-add"><font-awesome-icon :icon="['fas', 'user-plus']" /> ADD</button>
            </div>
         </div>
         <div class="list">
            <div class="list-con">
                <h3 style="color: #4fc4f7;">Students : {{ students.length }}</h3>
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
                            <div class="tbody" id="it" alt="Profile" ><img id="img":src="student.profile" alt="Profile"></div>
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
            students:[],
            inputlrn:'',
            firstName:'',
            middleName:'',
            lastName:'',
            warning:true,
            
            classname: ''
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
                return
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
                this.inputlrn='';
                this.firstName='';
                this.middleName = '';
                this.lastName = '';
                await this.getClassData(this.classid);
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
                const res = await api.post('/data/teacher/classname',{
                    classid:this.classid
                });
                // this.user = res.data;
                this.classname = res.data.classname;
            } catch (err) {
                console.error('Error fetching data:', err);
                if(err.response && err.response.status === 401) {
                    this.$router.push('/');
                } else {
                    alert(err.response.data.message);
                }
            }
        },
        async refreshtoken(){
            try {
                const res = await api.post('/refresh-token');
                // this.user = res.data;
                // console.log('Token refreshed successfully in class:', res.data);
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
.classname{
    margin-top: 0;
    margin-bottom: 100px;
    color: #4fc4f7;
}
.title{
    font-weight: 800;
    font-size: 30px;
    margin-bottom: 0;
    color: #4fc4f7;
}
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
    transition: 0.3s;
}
.btn-add:hover{
    background-color: #6ae990;
    transform: scale(1.1);
    transition: 0.3s;
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
#it:has(.tbody:hover){
    background-color: aqua;
}
.table-head,.tr-body{
    
    display: flex;
    text-align: center;
}
.table-head{
    background-color: #4fc4f7;
    height: 50px;
    color: #ccc;
}
/* .tbody:hover{
    background-color: blue;
} */
.tbody{
    height: 55px;
    /* background-color: white; */
}
.thead{
    background-color: #4fc4f7;
    color: white;
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
    /* background-color: rgb(235, 235, 235); */
    height: 100vh;
    width: 100vw;
    display: flex;
}
body::before {
    z-index: -1;
    background-image: url('/images/bg.png');
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
}
</style>
<template>
    <div class="cluster-enrolled-con" v-if="failedcluster">
        <div class="cluster-enroll">
            <header>
                <button @click="closerFailed()"><font-awesome-icon :icon="['fas', 'xmark']" size="lg"/></button>
                <h1>failed!</h1>
                <h4>Student : {{ failedlist.length }}</h4>
            </header>
            
            <ul class="cluster-list">
                <li class="item-list" v-for="student in failedlist" :key="student.lrn">
                    <p>Lrn : {{ student.lrn }}</p>
                    <p>name : {{ student.name }}</p>
                </li>
            </ul>
            
        </div>
    </div>
    <div class="cluster-enrolled-con" v-if="enrolledcluster">
        <div class="cluster-enroll">
            <header>
                <button @click="closeEnrolledlist()"><font-awesome-icon :icon="['fas', 'xmark']" size="lg"/></button>
                <h1>Enrolled previously</h1>
                <h4>Student : {{ enrollStudentlist.length }}</h4>
            </header>
            
            <ul class="cluster-list">
                <li class="item-list" v-for="student in enrollStudentlist" :key="student.lrn">
                    <p>Lrn : {{ student.lrn }}</p>
                    <p>name : {{ student.name }}</p>
                    <p>firstName : {{ student.firstName }}</p>
                    <p>middleName : {{ student.middleName }}</p>
                    <p>lastName : {{ student.lastName }}</p>
                </li>
            </ul>
            
        </div>
    </div>
    <div class="cluster-enrolled-con" v-if="newenrolledcluster">
        <div class="cluster-enroll">
            <header>
                <button @click="closenewEnrolledlist()"><font-awesome-icon :icon="['fas', 'xmark']" size="lg"/></button>
                <h1>New Students</h1>
                <h4>Student : {{ newEnrolled.length }}</h4>
            </header>
            
            <ul class="cluster-list">
                <li class="item-list" v-for="student in newEnrolled" :key="student.lrn">
                    <p>Lrn : {{ student.lrn }}</p>
                    <p>name : {{ student.name }}</p>
                    <p>firstName : {{ student.firstname }}</p>
                    <p>middleName : {{ student.middlename }}</p>
                    <p>lastName : {{ student.lastname }}</p>
                </li>
            </ul>
            
        </div>
    </div>
    <div class="loading-con" v-if="loading">
        <div class="loading"></div>
    </div>
    <div class="cluster-con" v-if="cluster">
        <div class="cluster">
            <div class="cluster-header">
                <button @click="openCluster(true)" class="btn-cluster-delete"><font-awesome-icon :icon="['fas', 'xmark']" size="lg"/></button>
                <h1 v-if="editordelete" style="color: #ffda03;">Edit</h1>
                <h1 v-else style="color: red;">Delete</h1>
            </div>
            <div v-if="!editordelete" class="cluster-body">
                <p>lrn {{ elrn }}</p>
                <p>{{ ename }}</p>
                <p>First Name : {{ efname }}</p>
                <p>Middle Name : {{ emname }}</p>
                <p>Last Name : {{ elname }}</p>
                <p>Password : {{ epassword }}</p>
            </div>
            <div class="edit-cluster-body" v-else>
                <p>lrn {{ elrn }}</p>
                <label for="FirstName ">First Name </label>
                <input name="FirstName" type="text" placeholder="First Name " v-model="efname" :class="warning? 'not-warning' : 'warning'">
                <label for="MiddleName">Middle Name</label>
                <input name="MiddleName" type="text" placeholder="Middle Name" v-model="emname" :class="warning? 'not-warning' : 'warning'">
                <label for="LastName">Last Name</label>
                <input name="LastName" type="text" placeholder="Last Name" v-model="elname" :class="warning? 'not-warning' : 'warning'">
                <label for="password">Password</label>
                <input name="password" type="text" placeholder="Password" v-model="epassword" :class="warning? 'not-warning' : 'warning'">
            </div>
            <footer class="cluster-footer">
                <button v-if="!editordelete" class="btn-cluster-action-delete" @click="deletestudent()"><font-awesome-icon :icon="['fas', 'trash']" style="color: white;" /> DELETE</button>
                <button v-if="editordelete" class="btn-cluster-action-edit" @click="editstudent()">Save</button>
            </footer>
            
        </div>
    </div>
    <body>
        <!-- <navbar /> -->
         <div class="add-student-con">
            <div class="form-con">
                <div class="form-header">
                    <button @click="addorupload(false)" :style="{borderBottom: !uploadFile ? '2px solid #4fc4f7' : 'none'}">add</button>
                    <button @click="addorupload(true)" :style="{borderBottom: uploadFile ? '2px solid #4fc4f7' : 'none'}">upload</button>
                </div>
                <div class="form" v-if="uploadFile">
            
                    <h2 class="title">Add Student</h2>
                    <h4 class="classname">Class Name : {{ classname }}</h4>
                    <h3>📤 Upload Student List</h3>
                    <h5>Accepted format: .xlsx file with LRN and Name columns</h5>
                    <!-- <small></small> -->
                    <form @submit.prevent="handleUpload" enctype="multipart/form-data" :class="{ 'disabled-form': uploading }">
                        <!-- <label for="moduleFile" clnhass="upload-label">
                        📄 Upload Module / Lesson File
                        <input type="file" @change="handleFileChange" accept=".pdf,.xlsx,.xls" required />
                        </label> -->
                        <input type="file" @change="handleFileChange" class="upload-label" accept=".xlsx,.xls" required :disabled="uploading"/>
                        <button type="submit" v-if="selectedFile" class="btn-upload" :disabled="uploading">Upload</button>

                        <div v-if="uploading">
                        Uploading: {{ progress }}%
                        <progress :value="progress" max="100"></progress>
                        </div>
                    </form>

                    <!-- <div v-if="uploading" class="progress-bar">
                    <progress :value="progress" max="100"></progress>
                    <p>{{ progress }}%</p> -->
                    <!-- </div> -->
                </div>
                <div class="form" v-else>
                    <h2 class="title">Add Student</h2>
                    <h4 class="classname">Class Name : {{ classname }}</h4>
                    <input type="text" placeholder="LRN" v-model="inputlrn" :class="warning? 'not-warning' : 'warning'">
                    <input type="text" class="input" placeholder="First Name" v-model="firstName">
                    <input type="text" class="input" placeholder="Middle Name" v-model="middleName">
                    <input type="text" class="input" placeholder="Last Name" v-model="lastName">
                    <button @click="enrollStudent()" class="btn-add" id="btn-add"><font-awesome-icon :icon="['fas', 'user-plus']" /> ADD</button>
                </div>
            </div>
            
         </div>
         <div class="list">
            <div class="list-con">
                <div class="header-list">
                    <h3 style="color: #4fc4f7;">Student Count : {{ students?.length }}</h3>
                    <h3 style="color: #4fc4f7;">Class Level : {{ classLevel }}</h3>
                </div>
                
                <div class="table">
                    <div class="table-head">
                        <div class="thead"><strong>Profile</strong></div>
                        <div class="thead"><strong>Name</strong></div>
                        <!-- <div class="thead"><strong>Middle Name</strong></div>
                        <div class="thead"><strong>Last Name</strong></div> -->
                        <div class="thead"><strong>LRN</strong></div>
                        <div class="thead"><strong>Password</strong></div>
                        <div class="thead"><strong>Action</strong></div>

                    </div>
                    <div class="table-body">
                        <div class="tr-body" v-for="student in students" :key="student.lrn">
                            <div class="tbody" id="it" alt="Profile" ><img id="img":src="student.profile" alt="Profile"></div>
                                <div class="tbody"><p>{{student.name}}</p></div>
                                <!-- <div class="tbody"><p>{{ student.middlename }}.</p></div>
                                <div class="tbody"><p>{{student.lastname}}</p></div> -->
                                <div class="tbody"><p>{{student.lrn}}</p></div>
                                <div class="tbody"><p>{{student.password}}</p></div> 
                            <div class="tbody">
                                <button class="action-btn" id="edit-icon" @click="openCluster(
                                        true,
                                        student.lrn,
                                        student.name,
                                        student.firstname,
                                        student.middlename,
                                        student.lastname,
                                        student.password)">
                                    <font-awesome-icon :icon="['fas', 'user-pen']"  style="color:#ffda03;" />
                                </button>
                                <button class="action-btn" id="trash-icon" 
                                    @click="openCluster(
                                        false,
                                        student.lrn,
                                        student.name,
                                        student.firstname,
                                        student.middlename,
                                        student.lastname,
                                        student.password)">
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
import loading from './components/loading.vue';
import navbar from './components/navbar.vue';
import api from '@/axios';
export default{
    name:'Create Class',
    components:{
        navbar,
        loading
    },
    data(){
        return{
            enrollStudentlist:[],
            failedlist:[],
            newEnrolled:[],
            newenrolledcluster:false,
            enrolledcluster:false,
            failedcluster: false,
            selectedFile: null,
            uploading: false,
            progress: 0,
            classid:this.$route.query.i,
            students:[],
            inputlrn:'',
            firstName:'',
            middleName:'',
            lastName:'',
            warning:true,
            cluster:false,
            editordelete: true,
            classname: '',
            loading:false,
            classLevel:'',
            
            ename:'',
            efname:'',
            elrn:'',
            emname:'',
            elname:'',
            epassword:'',

            Dlrn:'',
            uploadFile:true

            ,file:null,
            progress:null
        }
    },
    methods:{
        async editstudent(){
            this.loading = true;
            try{
                if( !this.elrn || !this.efname || !this.emname || !this.elname || !this.epassword ){
                    alert('Fill up the form')
                    return
                }
                this.loading = true;
                const res = await api.post('/edit/student',{
                    lrn:this.elrn,
                    fname:this.efname,
                    mname:this.emname,
                    lname:this.elname,
                    password:this.epassword
                });
                this.getClassData(this.classid);
            }catch(err){
                console.log(err);
                this.loading = false;
                alert(err.status.data.message);
            }
            this.cluster = !this.cluster;
            this.loading = false;
        },
        addorupload(up){
            this.uploadFile =up;
        },
        async getClassData(classIn) {
            try {
                const res = await api.post('/get/classData', {
                    classId: classIn
                });

                console.log('Student list:', res.data);
                this.students = res.data.list;
                this.classLevel = res.data.gradelevel;
                this.students = this.students?.sort((a, b) => {
                    const nameA = a.name || '';
                    const nameB = b.name || '';
                    return nameA.localeCompare(nameB);
                });
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
            // const btnadd = document.getElementById('btn-add');
            // btnadd.disabled = true;
            this.loading = true;
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
            // btnadd.disabled = false;
            this.loading = false;
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
        openCluster(edit,lrn,name,fname,mname,lname,password){
            this.cluster = !this.cluster;
            this.ename = name;
            this.editordelete = edit;
            this.efname=fname;
            this.elrn = lrn;
            this.emname = mname;
            this.elname = lname;
            this.epassword = password

            
                this.Dlrn = lrn;
            
        },
        async deletestudent(){
            this.loading = true;
            this.cluster = false;
            if(!this.Dlrn){
                alert('Select a student to delete');
                this.loading = false;
                return;
            }
            try{
                const res = await api.delete('/remove/student',{
                    data: { lrn: this.Dlrn }
                });

                console.log(res.data);
                await this.getClassData(this.classid);
                
            }catch(err){
                console.log(err);
                alert(err.status.data.message);
            }
            this.loading =false;
        },
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
        closenewEnrolledlist(){
            this.newenrolledcluster=false;
        },
        closeEnrolledlist(){
            this.enrolledcluster=false;
        },
        closerFailed(){
            this.failedcluster = false;
        },

        async handleUpload() {
            if (!this.selectedFile) {
                alert("Please select a file first.");
                return;
            }

            const formData = new FormData();
            formData.append('file', this.selectedFile);
            formData.append('classId',this.classid);
            this.uploading = true;
            this.progress = 0;

            try {
                const response = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 20000, // ⏳ Increase timeout to 20 seconds
                onUploadProgress: (progressEvent) => {
                    this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
                });
                
                // this.students = response.data;
                console.log('Uploaded students:', response.data);
                if(response.data.message === 'All students are already enrolled'){
                    console.log(response.data.enrolled)
                    return alert(response.data.message);
                }
                this.newEnrolled= response.data.insterted;
                if(this.newEnrolled.length > 0){
                    this.newenrolledcluster = true;
                }
                this.enrollStudentlist = response.data.enrolled;
                if(this.enrollStudentlist.length > 0){
                    this.enrolledcluster = true;
                }
                this.failedlist = response.data.failed;
                if(this.failedlist.length > 0){
                    this.failedcluster = true;
                }
                await this.getClassData(this.classid);
            } catch (err) {
                console.error(err);
                
                alert("Upload failed.");
            } finally {
                this.uploading = false;
            }
        }
        
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
        // this.refreshtoken();
        this.getData();
        this.getClassData(this.classid);
        
    }
    
}
</script>
<style scoped>
.header-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    /* margin: 10px auto; */
}
.btn-upload{
    border: none;
    background-color: #4fc4f7;
    color: white;
    border-radius: 5px;
    font-weight: 800;
    height: 35px;
    width: 70px;
    padding: 7px;
    margin-left:10px;
    display: flex;
    text-align: center;
    justify-content: center;
    cursor: pointer;
}
.upload-label{
    outline: none;
    border: 2px dashed #4fc4f7;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    display: block;
    margin: 20px auto;
    border-radius: 10px;
    width: 80%;
    background-color: #f8f9fa;
    transition: all 0.3s ease;
    font-size: 14px;
    color: #666;
}

.upload-label:hover {
    border-color: #2196F3;
    background-color: #e3f2fd;
    transform: translateY(-2px);
}

.upload-label:focus {
    border-color: #2196F3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.upload-label::file-selector-button {
    display: none;
    background-color: #4fc4f7;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    font-weight: 500;
    transition: background-color 0.3s ease;
}

.upload-label::file-selector-button:hover {
    background-color: #2196F3;
}
.edit-cluster-body label{
    font-size: 12px;
    margin: 0;
    justify-self: baseline;
    align-self: self-start;
    left: auto;
}
.edit-cluster-body{
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.list-table{
    height: 90%;
    width: 90%;
    background-color: white;
}
.list{
    width: 75%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.item-list{
    color: white;
    font-weight: 700;
    margin-top: 2em;
    padding: 10px;
    border-radius: 10px;
    width: inherit;
    height: fit-content;
    background-color: #7ab9fc;
}
.cluster-list{
    list-style: none;
    width: 90%;
    height: 80%;
    overflow-y: auto;
    scrollbar-width: none;
}
.cluster-enroll header button{
    border: none;
    background-color: transparent;
    color: red;
    align-self: flex-end;
    margin-top: 5px;
    margin-right: 5px;
}
.cluster-enroll header{
    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
}
.cluster-enroll{
    background-color: white;
    height: 90%;
    width: 50%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.cluster-enrolled-con{
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgb(0, 0, 0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.form-header{
    padding: 5px;
}
.form-header button{
    border: none;
    background-color: white;
    color: #4fc4f7;
    font-weight: 800;
}
.form-con{
    border-radius: 5px;
    background-color: white;
    height: 600px;
}
.upload-container {
  padding: 20px;
  max-width: 600px;
  margin: auto;
}
.progress-bar {
  margin: 10px 0;
}
progress {
  width: 100%;
  height: 20px;
}
.cluster-footer{
    height: fit-content;
    display: flex ;
    justify-content: end;
    align-items: center;
    width: 100%;
}
.btn-cluster-action-edit{
   border: none;
    background-color: rgb(228, 231, 43);
    color: white;
    border-radius: 5px;
    font-weight: 800;
    height: 35px;
    width: 70px;
    padding: 7px;
    margin-right:3px;
    display: flex;
    text-align: center;
    justify-content: center;
}
.cluster-footer .btn-cluster-action-delete{
    border: none;
    background-color: red;
    color: white;
    border-radius: 5px;
    font-weight: 800;
    height: 35px;
    width: 70px;
    padding: 7px;
    margin-right:3px;
    display: flex;
}
.loading-con{
    position: fixed;
}
.cluster-body p{
    margin-top: 10px;
}
.cluster-body{

    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.cluster-header{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.btn-cluster-delete{
    background-color: transparent;
    color: red;
    border: none;
    align-self: flex-end;
    justify-self: center;
    
}
.btn-cluster-delete:hover{
    color: rgb(216, 0, 0);
}
.cluster-con,.loading-con{
    border-radius: 10px;
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.cluster{
    background-color: white;
    height: fit-content;
    width: 350px;
    border-radius: 10px;
    display: flex;
    align-items: center;
     flex-direction: column;
    /* justify-content: center;   */
}
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
    height: 70%;
    min-width: 300px;
    max-width: 300px;
    /* width: 80%; */
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
    animation: in 1s linear
    /* background-color: white; */
}
.thead{
    background-color: #4fc4f7;
    color: white;
    
}
@keyframes in {
    from{
        background-color: #6ae990;
    }
    to{
        background-color: white;
    }
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
    flex-direction: column;
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
<template>
    <body>
        <navbar/>
        <main>
            <h1 class="title">Class </h1>
            <header>
                <select
                    name="class"
                    class="selectClass"
                    v-model="selectedClassId"
                    @change="getClassData(selectedClassId)"
                    >
                    <option
                        v-for="classes in user?.class"
                        :key="classes.Class_id"
                        :value="classes.Class_id"
                    >
                        {{ classes.Class_name }}
                    </option>
                </select>


                <button class="add-student" @click="goToEditClass()"><font-awesome-icon icon="fa-solid fa-user-plus" /> Add student</button>
            </header>
            <div class="student-list">
                <div class="student-list-con">
                    <!-- <table class="student-list-table">
                        <thead>
                            <tr>
                                <th>firstName</th>
                                <th>MiddleName</th>
                                <th>LastName</th>
                                <th>LRN <font-awesome-icon :icon="['fas', 'sort']"  @click="sortByLrn()"/></th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="student in students" :key="student.lrn">
                                <td>{{ student.firstname }}</td>
                                <td>{{ student.middlename }}</td>
                                <td>{{ student.lastname }}</td>
                                <td>{{ student.lrn }}</td>
                                <td>{{ student.password }}</td>
                                <td>
                                    <button class="action-btn" id="edit-icon">
                                        <font-awesome-icon :icon="['fas', 'user-pen']"  class="edit-icon" />
                                    </button>
                                    <button class="action-btn" id="trash-icon">
                                        <font-awesome-icon :icon="['fas', 'trash']" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table> -->
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
                        <div class="table-body" v-if="students.length !== 0">
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
                        <!-- <div class="footer">
                            <button><font-awesome-icon icon="fa-regular fa-floppy-disk" /> Save</button>
                        </div> -->
                    
              
                    <div class="nodata" v-if="students.length == 0">
                        <h1>No student enrolled</h1>
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
export default {
    components: {
        navbar,
        loading
    },
    data() {
        return {
            selectedClassId: null,

            classlength: 0,
            classInput:null,
            user: null,
            infoName: '',
            infoMiddleName: '',
            infoLastName: '',
            students: [
                { firstName: 'John Doe',middleName: 'A.', lastName: 'Smith', lrn: '1234567890', password: 'password123' },
                { firstName: 'Jane', middleName: 'B.', lastName: 'Doe', lrn: '0987654321', password: 'password456' },
                { firstName: 'Alice', middleName: 'C.', lastName: 'Johnson', lrn: '1122334455', password: 'password789' },
                { firstName: 'Bob', middleName: 'D.', lastName: 'Brown', lrn: '5566778899', password: 'password101' },
                { firstName: 'Charlie', middleName: 'E.', lastName: 'Davis', lrn: '2233445566', password: 'password202' },
                { firstName: 'David', middleName: 'F.', lastName: 'Garcia', lrn: '7788990011', password: 'password303' },
                { firstName: 'Eva', middleName: 'G.', lastName: 'Martinez', lrn: '3344556677', password: 'password404' },
                { firstName: 'Frank', middleName: 'H.', lastName: 'Lopez', lrn: '8899001122', password: 'password505' },
                { firstName: 'Grace', middleName: 'I.', lastName: 'Wilson', lrn: '4455667788', password: 'password606' },
                { firstName: 'Henry', middleName: 'J.', lastName: 'Anderson', lrn: '0011223344', password: 'password707' },
                { firstName: 'Isabella', middleName: 'K.', lastName: 'Thomas', lrn: '6677889900', password: 'password808' },
                { firstName: 'Jack', middleName: 'L.', lastName: 'Taylor', lrn: '1122334455', password: 'password909' },
                { firstName: 'Liam', middleName: 'M.', lastName: 'Moore', lrn: '9988776655', password: 'password010' },
                { firstName: 'Mia', middleName: 'N.', lastName: 'Jackson', lrn: '5566778899', password: 'password111' },
                { firstName: 'Noah', middleName: 'O.', lastName: 'White', lrn: '2233445566', password: 'password222' },
                { firstName: 'Olivia', middleName: 'P.', lastName: 'Harris', lrn: '7788990011', password: 'password333' },
                
                
            ],
            user:null
        };
    },
    methods:{
        goToEditClass(){
            this.$router.push({ name: 'createClass',query: { i: this.selectedClassId } });
        },
        sortByLrn() {
            this.students.sort((a, b) => a.lrn.localeCompare(b.lrn));
           
        },
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

        async getData() {
            try {
                const res = await api.get('/data/teacher');
                this.user = res.data;

                // Automatically select the first class if available
                if (this.user.class && this.user.class.length > 0) {
                    const firstClass = this.user.class[0];
                    this.selectedClassId = firstClass.Class_id;
                    this.classInput = firstClass;
                    this.getClassData(this.selectedClassId);
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

        async refreshtoken(){
            try {
                const res = await api.post('/refresh-token');
                this.user = res.data;
                console.log('Token refreshed successfully in class:', res.data);
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
    },
    mounted(){
        this.refreshtoken();
    }
}
</script>
<style scoped>
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
.table-body:has(.tbody:hover){
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
    
    height: 100%;
    width: 100%;
    background-color: white;
}
.nodata{
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    height: inherit;
    /* background-color: #4fc4f7; */
}
.add-student{
    background-color: white;
    color: #4fc4f7;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    height: 50px;
    width: fit-content;
    transition: 0.3s;
}
.add-student:hover{
    background-color: #4fc4f7;
    color: white;
    transition: 0.3s;
}
#trash-icon{
    color: #ff0000;
    font-size: 1.2em;
    transition: color 0.3s ease;
}
#trash-icon:hover {
    color: white;
    background-color: #ff0000;
}
#edit-icon:hover {
    background-color: #FFD43B;
    color: white;

}
#edit-icon{
    border-radius: 3px;
    color: #FFD43B;
    cursor: pointer;
    font-size: 1.2em;
    transition: color 0.3s ease;
}
.action-btn{
    height: fit-content;
    width: fit-content;
    margin: 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}
.student-list{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 77%;
}
.student-list-table thead {
  background-color: #f5f5f5;
  
}
.student-list-con .student-list-table td{
    
    padding-top: 10px;
    text-align: center;
    border-bottom: 1px solid #ccc;
}
.student-list-con{
    overflow: auto;
    scrollbar-width: thin;
    border-radius: 10px;
    background-color: white;
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
}
.student-list-con .student-list-table{
    
    width: 100%;
    height: fit-content;
    border-collapse: collapse;
    gap: 10px;
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.title{
    margin-left: 10px;
}
body {
    background-color: rgb(235, 235, 235);
    height: 100vh;
    width: 100vw;
    display: flex;
}
main {
    
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  
}
header{
    height: 70px;
    width: 100%;
    display: flex;
    gap: 2em;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
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
</style>
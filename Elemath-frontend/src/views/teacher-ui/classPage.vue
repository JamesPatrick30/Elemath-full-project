<template>
    <body>
        <navbar/>
        <main>
            <h1 class="title">Class </h1>
            <header>
                <select name="class" id="" class="selectClass">
                    <option value="">asdsd</option>
                    <option value="">asdsd</option>
                    <option value="">asdsd</option>
                </select>
            </header>
            <div class="student-list">
                <div class="student-list-con">
                    <table class="student-list-table">
                        <thead>
                            <tr>
                                <th>firstName</th>
                                <th>MiddleName</th>
                                <th>LastName</th>
                                <th>LRN <font-awesome-icon :icon="['fas', 'sort']"  @click="sortByLrn()"/></th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="student in students" :key="student.lrn">
                                <td>{{ student.firstName }}</td>
                                <td>{{ student.middleName }}</td>
                                <td>{{ student.lastName }}</td>
                                <td>{{ student.lrn }}</td>
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
                    </table>
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
            classlength: 0,
            user: null,
            infoName: '',
            infoMiddleName: '',
            infoLastName: '',
            students: [
                { firstName: 'John Doe',middleName: 'A.', lastName: 'Smith', lrn: '1234567890' },
                { firstName: 'Jane Doe', middleName: 'B.', lastName: 'Johnson', lrn: '0987654321' },
                { firstName: 'Alice', middleName: 'C.', lastName: 'Brown', lrn: '1122334455' },
                { firstName: 'Bob', middleName: 'D.', lastName: 'Davis', lrn: '5566778899' },
                
            ],
        };
    },
    methods:{
        sortByLrn() {
            this.students.sort((a, b) => a.lrn.localeCompare(b.lrn));
        },
    }
}
</script>
<style scoped>
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
    height: 100%;
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
    border-radius: 10px;
    background-color: white;
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center;
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
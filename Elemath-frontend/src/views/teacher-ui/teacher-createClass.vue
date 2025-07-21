<template>
    <div class="create-con" v-if="createClassCluster">
        <div class="create">
            <button @click="createClassClusterToggle()">X</button>
            <input type="text" placeholder="Class Name" v-model="className">
            <button @click="createClass()">Create Class</button>
        </div>
    </div>
    <div class="body" v-if="user">
        <navbar></navbar>
        <main>
            <div class="header">
                <h3>Welcome back, {{ user?.username }}</h3>
            </div>
            <div class="contaner">
                <button @click="createClassClusterToggle()">+</button>
            </div>
        </main>
    </div>
    <loading v-else />
</template>
<script>
import api from '@/axios'; // Axios instance
import navbar from './components/navbar.vue';
import loading from './components/loading.vue';
export default {
    name: 'TeacherCreateClass',
    components: {
        navbar,
        loading
    },
    
    data() {
        return {
            className: '',
            createClassCluster:false,
            user: null,
        };
    },
    methods: {
        // Add methods for handling class creation logic
        async createClass() {
            try {
                const response = await api.post('/createClass', {
                    ClassName: this.className,
                });
                if (response.status === 200) {
                    // Handle successful class creation, e.g., redirect to class list
                    this.$router.push({ name: 'teacher-ui' });
                }
            } catch (error) {
                console.error('Class creation failed:', error);
            }
        },
        createClassClusterToggle() {
            this.createClassCluster = !this.createClassCluster;
        },
        async getData() {
            try {
                const res = await api.get('/data/teacher');
                this.user = res.data;
                
                this.infoName = this.user.firstName;
                this.infoMiddleName = this.user.middleName;
                this.infoLastName = this.user.lastName;
                this.classlength = this.user.class.length;
                console.log('Data fetched successfully:', this.classlength);
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
        }
    },
    mounted() {
        this.refreshtoken();
    },
};
</script>
<style scoped>
.create-con {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    z-index: 10;
    background-color: rgba(0, 0, 3, 0.70);
}
.create{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
}
*{
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
/* .logo{
    height: auto;
    width: 100%;
    margin-top: 0%;
    margin-bottom: 10px;
} */
.body {
    display: flex;
    height: 100vh;
    width: 100vw;
}
main {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: aliceblue;
}
/* nav {
    
    width: 20%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: baseline;
}
nav ul {
    margin-top: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
nav ul li{
    border-radius: 30px;
    cursor: pointer;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #4fc4f7;
    font-weight: bold;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
    transition: 0.3s;
}
nav ul li:hover{
    transition: 0.3s;
    background-color: #4fc4f7;
    color: white;
} */
.contaner{
    height: 90%;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.contaner button{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #4fc4f7;

    color: white;
    font-size: 30px;
    border: none;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(0, 0, 3, 0.15);
    transition: 0.3s;
}
.contaner button:hover{
    background-color: #67c6e9;
    transform: scale(1.1);
    transition: 0.3s;
}
#item{
    background-color: white;
    box-shadow: 0 6px 16px rgba(0, 0, 3, 0.15);
    border-radius: 20px;
}
.header{
    height: 10%;
    width: 100%;
    display: flex;
    text-align: center;
    position:relative;
    margin-top: 0%;

    color: #4fc4f7;
}
.header h3{
    margin-left: 30px;
}
</style>
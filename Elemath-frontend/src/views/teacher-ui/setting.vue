<template>
    <body  v-if="user">
        <navbar :classlength = classlength></navbar>
        <main>
            <header class="main-header">
                <h4>Settings</h4>
            </header>
            <section class="basic-info-section" >
                <header class="section-header">Basic Info</header>
                <div class="basic-info">
                    <div class="input-container">
                        <label for="Name">First Name</label>
                        <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="infoName" readonly>
                    </div>
                    <div class="input-container">
                        <label for="Name"> Middle Name</label>
                        <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="infoMiddleName" readonly>
                    </div>
                    <div class="input-container">
                        <label for="Name"> Last Name</label>
                        <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="infoLastName" readonly>
                    </div>
                    <div class="input-container">
                        <label for="Name">Name</label>
                        <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="infoName" readonly>
                    </div>
                    
                </div>
                <div class="update-container">
                    <button class="update-btn" @click="btnBasicInfo()">Update</button>
                </div>
            </section>
            <section class="basic-info-section">
                <header class="section-header" >Basic Info</header>
            </section>
            <section class="basic-info-section">
                <header class="section-header">Basic Info</header>
            </section>
            <button class="logout" @click="logout()">logout</button>
        </main>
    </body>
    <loading v-else />
</template>
<script>
import api from '@/axios';
import socket from '@/socket';
import navbar from './components/navbar.vue';
import loading from './components/loading.vue';
export default{
    name: 'Setting',
    components: {
        navbar,
        loading
    },
    data() {
        return {
            
            showInfo: false,
            infoName:'',
            infoMiddleName:'',
            infoLrn: '',
            updateBasicInfo:false,
            user: null,
            classlength:null
        };
    },
    methods: {
        btnBasicInfo() {
            this.updateBasicInfo = !this.updateBasicInfo;

            const inputFields = document.querySelectorAll('.input-basic');
            inputFields.forEach((input) => {
                if (this.updateBasicInfo) {
                    input.removeAttribute('readonly');
                    input.style.borderBottom = '2px solid #4fc4f7';
                } else {
                    input.setAttribute('readonly', 'readonly');
                    input.style.backgroundColor = 'white';
                    input.style.borderBottom = 'none';
                }
            });
        },
        // showInfofunction(student) {
        //     this.showInfo = true;
        //     this.infoName = student.name;
        //     this.infoLrn = student.lrn;
        // },
        async logout() {
            try {
                const response = await api.post('/api/logout');
                console.log(response.data.message);

                if (socket.connected) {
                    socket.disconnect();
                    console.log("Socket disconnected on logout");
                }
                this.$router.push('/'); // Redirect to the home page or login page
            } catch (error) {
                console.error('Logout failed:', error);
            }
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
        // this.refreshtoken();
        this.getData();
    }
}</script>
<style scoped>

.input-container {
    display: flex;
    flex-direction: column;
    align-items:baseline;
    justify-content: center;
    width: 60%;
    height: 100%;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
    font-weight: 500;
}
.input-basic:focus {
    outline: none;
}
.input-basic{
    width: 100%;
    height: 20px;
    border-radius: 5px;
    border: none;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #4fc4f7;
    background-color: white;

}
.update-btn{
    margin-right: 15px;
    background-color: #66f861;
    color: white;
    width: 100px;
    height: 40px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    border: none;
}
.update-container{
    display: flex;
    justify-content:end;
    align-items: center;
    margin-top: 20px;
    height: 10px;
}
.basic-info{
    
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-items: center;
    justify-items: center;
    height: 280px;
    width: 100%;
}
.logout{
    background-color: #4fc4f7;
    color: white;
    width: 100px;
    height: 40px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    margin: 20px ;
    justify-self: center;
    align-self: center;
}
main .main-header h4 {
    margin: 0;
    padding: 20px;
    color: #4fc4f7;
    font-size: 24px;
    font-weight: bold;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
main .main-header {
    /* margin: 0; */
    margin-top: 0px;
    text-align: start;
    color: #4fc4f7;
    font-size: 30px;
    font-weight: bold;
}
.basic-info-section {
    background-color: white;
    width: 80%;
    height: 400px;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 10px;
    align-self: center;
    justify-self: center;
}
section .section-header {
    background-color: #d9f1fc;
    color: #4fc4f7;
    padding: 20px;
    text-align:left;
    font-size: 24px;
    font-weight: bold;
    padding: 10px;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}

body{
    background-color: rgb(235, 235, 235);
    height: 100vh;
    width: 100vw;
    display: flex;
}
main{
    height: 100%;
    width: 100%;
    /* display:flexbox;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
    overflow: auto;
    scrollbar-width: thin;
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
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.logo{
    height: auto;
    width: 100%;
    margin-top: 0%;
    margin-bottom: 10px;
}
</style>
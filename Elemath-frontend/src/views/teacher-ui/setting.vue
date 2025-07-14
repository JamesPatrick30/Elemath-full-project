<template>
    <body>
        <nav>
            <img class="logo" src="/images/logo.jpg" alt="">
            <ul>
                <li class="item1">Home</li>
                <li class="item2">Profile</li>
                <li class="item3">History</li>
                <li class="item4">Settings</li>
            </ul>
        </nav>
        <main>
            <header class="main-header">
                <h4>Settings</h4>
            </header>
            <section>
                <header class="section-header">Basic Info</header>
            </section>
            <section>
                <header class="section-header" >Basic Info</header>
            </section>
            <section>
                <header class="section-header">Basic Info</header>
            </section>
            <button class="logout" @click="logout()">logout</button>
        </main>
    </body>
</template>
<script>
import api from '@/axios';

export default{
    name: 'Setting',
    data() {
        return {
            students: [
                { name: 'John Doe', lrn: '123456789' },
                { name: 'Jane Smith', lrn: '987654321' },
                { name: 'Alice Johnson', lrn: '456789123' },
                { name: 'Bob Brown', lrn: '321654987' }
            ],
            showInfo: false,
            infoName: '',
            infoLrn: ''
        };
    },
    methods: {
        showInfofunction(student) {
            this.showInfo = true;
            this.infoName = student.name;
            this.infoLrn = student.lrn;
        },
        async logout() {
            try {
                const response = await api.post('/api/logout');
                console.log(response.data.message);
                this.$router.push('/'); // Redirect to the home page or login page
            } catch (error) {
                console.error('Logout failed:', error);
            }
        }
    }
}</script>
<style scoped>
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
section {
    background-color: white;
    width: 80%;
    height: 500px;
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
    width: 100%;
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
nav {
    
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
}
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
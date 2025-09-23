<script>
import greenbg from '../components/greenbg.vue';
import newnav from '../components/newnav.vue';
import api from '@/axios';
import header1 from '../components/header.vue';
export default{
    components:{
        greenbg,
        newnav,
        // latestnav,
        header1
    },
    data(){
        return{
            name:'',
            password:'',
            confirmPassword:'',
            navshow:false,
            profile:'',
            username:'',
            navshow:false,
            waitbtn:false,
            lrn:''
        }
    },
    methods:{
        async getdata(){
            try {
                const response = await api.get('/get/student/data'); // Adjust the endpoint as needed
                // console.log(response.data);
                this.username = response.data.name || 'John Doe';
                this.name = this.username;
                this.lrn = response.data.lrn || '123456789012';
                this.profile = response.data.profile;
                // console.log('Student ID:', response.data);
                // await this.lookforQuiz();
                // socket.connect();
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
            return;
        },
        switchNav(){
            this.navshow = !this.navshow;
        },
        async updateInfo(){
            if(this.password !== this.confirmPassword){
                return alert('Passwords do not match');
            }
            this.waitbtn = true;
            try{
                const res = await api.post('/update/student/info',{
                    username:this.name,
                    password:this.password
                });
                this.password = '';
                this.confirmPassword = '';
                this.getdata();
            }catch(e){
                console.error(e);
                return alert('Error updating info');
            }finally{
                this.waitbtn = false;
            }
        }
  },
    mounted(){
        this.getdata();
    }
}
</script>
<template>
    <greenbg></greenbg>
    
    <main>
        <header1 :info="{name:username,profile:profile,lrn:lrn}" ></header1>
        <!-- <header>
            <img class="profile" :src="profile" alt="" @click="switchNav">
            <div class="textcon">
                <p class="welcome">Welcome Back!</p>
                <p class="name">{{ username }}</p>
            </div>
        </header> -->
        <div class="form" >
            <h1>Basic Information</h1>

            <div>
                <p class="label">Username</p>
                <input type="text" id="name" v-model="name" />
            </div>
            <div>
                <p class="label">Password</p>
                <input type="text" id="email" v-model="password" />
            </div>
            <div>
                <p class="label">Confirm Password</p>
                <input type="text" id="email" v-model="confirmPassword" />
            </div>
            <button class="submit" @click="updateInfo" :disabled="waitbtn">Update</button>
        </div>
    </main>
    <div class="loading-container" v-if="waitbtn">
        <!-- <img src="/gif/loadingbox.gif" alt=""> -->
         <div class="loading"></div>
    </div>
        <!-- <latestnav :info="{name:username,profile:profile}" v-show="navshow"></latestnav> -->

</template>
<style scoped>
.loading-container{
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    /* z-index: 10; */
}
.submit{
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    width: 100%;
    padding: 10px;
    background-color: #4fc4f7;
}
input{
    border-radius: 5px;

    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}
.label{
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 0;
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.welcome,.name{
    margin: 0;
    padding: 0;
    margin-left: 10px;
}
.welcome{
    font-size: 10px;
        color: rgb(110, 110, 110);

}
.name{
    /* margin: 0; */
    
    font-weight: 700;
    font-size: 15px;
}
.profile{
    height: 50px;
    border-radius: 50%;
}
header{
    padding: 10px;
    /* border-radius: 10px; */
    width: fit-content;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    /* background-color: white; */
}
main{
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background-color: white; */
}
.form{
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 300px;
    background-color: white;
    padding: 20px;
}
</style>
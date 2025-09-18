<template>
    <body>
         <main>
            <div class="logo">
                <img class="img-logo" src="/images/logo.jpg" alt="">
            </div>
            <div class="form">
                <header>
                    <h1>Sign In</h1>
                    <h3>{{ role }}</h3>
                </header>
                
                <input v-if="role !='student'" class="text" type="text" placeholder="Email" v-model="email" required />
                <input v-else class="text" type="text" placeholder="LRN" v-model="email" required />
                <div class="passwordcontaner">
                    <input id= "password"type="password" placeholder="Password" v-model="password"  required />
                    <button class="btn" @click="see()">
                        <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06"/>
                            <path d="M1 1l22 22"/>
                            <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47"/>
                        </svg>
                    </button>
                </div>
                
<!-- <<<<<<< HEAD
                <button class="submit" type="submit" @click="login()">Sign In</button>
                <signGoogle ref="googleComponent" />
======= -->
                <button class="submit" type="submit" v-if="role=='student'" @click="Studentlogin()">Sign In</button>
                <button class="submit" type="submit" v-if="role !='student'" @click="login()">Sign In</button> 
                
                
                <signGoogle ref="googleComponent" v-if="role !== 'student'" />
<!-- >>>>>>> st -->
                
            </div>
        </main>
    </body>
   
</template>
<script>
// import socket from '@/socket';
import api from '@/axios';
import signGoogle from './signGoogle.vue';
import socket from '@/socket';
export default {
    name: 'SignIn',
    components: {
        signGoogle
    },
    data() {
        return {
            showPassword: false,
            role: this.$route.query.role , // Default to 'student' if no role is provided
            email: '',
            password: '',
        };
    },
    methods: {
        async Studentlogin(){
            if (!this.email || !this.password) {
                alert('Please fill in all fields');
                return;
            }
            try{
                const res = await api.post('/student-login',{
                    email:this.email,
                    password:this.password
                });
                socket.connect();
                this.$router.push({name : 'dash2'});
                // alert(res.data.message);
            }catch(err){
                console.log(err);

                alert(err.response.data.message);
            }
        },
        // Add methods for handling sign-in logic
        see(){
            this.showPassword = !this.showPassword;
            document.getElementById("password").type = document.getElementById("password").type === "password" ? "text" : "password";
        },
        async login(){
            try {
                const response = await api.post('/api/login', {
                    username: this.email,
                    password: this.password,
                    
                });
                if (response.status === 200) {
                    // Handle successful login, e.g., redirect to dashboard
                    socket.connect();
                    this.$router.push({ name: 'teacher-ui' });
                    if(response.data.classCount === 0){
                        this.$router.push({ name: 'teacher-create-class' });
                    } else {
                        this.$router.push({ name: 'teacher-ui' });
                    }
                }
            } catch (error) {
                console.error('Login failed:', error);
                alert(error.response.data.message || 'Login failed. Please try again.');
                // Handle login error, e.g., show an error message
            }
            
        },
        GoogleLogin() {
        this.$refs.googleComponent?.manualLogin?.();
        }

    },
    mounted() {
    }
};
</script>
<style scoped>
.form input{
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}

.form input::placeholder {
    color: white;
}
.logo{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
}
.img-logo{
    height: 350px;
}
body{
    background-image: url('../backgrounds/bgImage.png');
    background-size: cover;
    background-position: center;
}
main {
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
.passwordcontaner{
    width: 86%;
    display: flex;
    flex-direction: row;
    background-color: #464c84;
    border-radius: 20px;
}
.passwordcontaner .btn {
    width: 40px;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
}
.form {
    height: 80%;
    width: 100%;
    align-items: center;
    justify-items: center;
    text-align: center;
    max-width: 400px;
    border-top: #464c84 5px solid;
    
      font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
.form  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    gap: 20px;
}
.form header h1,
.form header h3 {
    margin: 0;
    padding: 0;
    color: #464c84;
}
.form header h3 {
    color: #0041d1;
}
.form input,.form button {
    position: relative;
    padding: 10px;
    border: none;
    border-radius: 20px;
    width: 80%;
    margin: 0% auto;
    color: white;
    background-color: #464c84;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
    transition: 30ms;
    
}
.passwordcontaner:focus-within {
    box-shadow: 0 0 8px 2px #4a39e9;
    transition: box-shadow ;
}
.form .text:focus, .form .submit:focus {
    outline: none;
    box-shadow: 0 0 5px #4a39e9;
}
.form #password:focus {
    outline: none;
}
.form .submit:hover {
    cursor: pointer;
    background-color: #4a39e9;
    transition: background-color 0.3s ease;
    scale: .95;
    transition: 200ms;
}
@media screen and (min-width: 1024px) {
    main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 200px;
        height: 100vh;
    }
    .form {
        width: 100%;
        max-width: 400px;
        border-left: #464c84 5px solid;
        border-top: none;
    }
    
}
</style>
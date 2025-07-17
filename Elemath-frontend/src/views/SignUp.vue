<template>
    <body>
        <main>
            <div class="logo">
                <img class="img-logo" src="/images/logo.jpg" alt="">
            </div>
            <div class="form">
                <header>
                    <h1>Sign Up</h1>
                    <h3>{{ role }}</h3>
                </header>
                
                <input class="text" type="text" placeholder="Teacher ID" v-model="username" required />
                <div class="passwordcontaner">
                    <input id= "password"type="password" placeholder="Password" v-model="password" required />
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
                </div><div class="passwordcontaner">
                    <input id= "confirmPassword"type="password" placeholder="Confirm Password" required />
                    <button class="btn" @click="confirmSee()">
                        <svg v-if="!showconfirmPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                
                <button class="submit" type="submit" @click="submitForm()">Sign In</button>
                <signGoogle ref="googleComponent" />
                
                
            </div>
        </main>
    </body>
    
</template>
<script>
import api from '@/axios';
import signGoogle from './signGoogle.vue';
import GoogleLogin from './teacher-ui/GoogleLogin.vue';
export default {
    name: 'SignIn',
    components: {
        signGoogle
    },
    data() {
        return {
            username: '',
            password: '',
            showPassword: false,
            showconfirmPassword: false,
            role: this.$route.query.role , // Default to 'student' if no role is provided
        };
    },
    methods: {
        // Add methods for handling sign-in logic
        see(){
            this.showPassword = !this.showPassword;
            document.getElementById("password").type = document.getElementById("password").type === "password" ? "text" : "password";
        },
        confirmSee(){
            this.showconfirmPassword = !this.showconfirmPassword;
            document.getElementById("confirmPassword").type = document.getElementById("confirmPassword").type === "password" ? "text" : "password";
        },
        // submitForm() {
        //     // Handle form submission logic here
        //     const password = document.getElementById("password").value;
        //     const confirmPassword = document.getElementById("confirmPassword").value;

        //     if (password !== confirmPassword) {
        //         alert("Passwords do not match!");
        //         return;
        //     }

        //     // Proceed with the sign-up logic, e.g., API call
        //     console.log("Form submitted with password:", password);
        // },
        async submitForm() {
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            try {
                const response = await api.post('/sign-up', {
                    username: this.username,
                    password: this.password
                });
                console.log("Sign-in successful:", response.data);
                this.$router.push('/');
                // Redirect or perform other actions after successful sign-in
            } catch (error) {
                console.error("Error during sign-in:", error);
                alert("Sign-in failed. Please try again.");
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
.img-logo{
    height: 400px;
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
.form #password:focus,
.form #confirmPassword:focus {
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
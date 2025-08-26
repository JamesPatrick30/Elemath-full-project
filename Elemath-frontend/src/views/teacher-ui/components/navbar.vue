<template>
    <nav>
            <img 
            class="logo" 
            src="/images/logo.jpg" 
            loading="lazy"
            alt="">
            <ul>
                <li class="item1" :class="((parameter === '/tc') || (parameter === '/th'))? 'in': 'out'" @click="goHome()">Home</li>
                <li class="item2" :class="parameter === '/an'? 'in': 'out'" @click="this.$router.push('/an')">Analytics</li>
                <li :class="parameter === '/c'? 'in': 'out'" @click="this.$router.push('/c')">Class</li>
                <li :class="parameter == '/g'? 'in': 'out'" @click="this.$router.push('/g')">Grade</li>
                <li class="item3" :class="parameter === '/t'? 'in': 'out'">History</li>
                <li class="item4" :class="parameter === '/ts'? 'in': 'out'" @click="this.$router.push('/ts')">Settings</li>
            </ul>
        </nav>
</template>
<script>
export default{
    name: 'Navbar',
    data() {
        return {
            parameter: null
        };
    },
    props: {
        classlength: Number
    },
    mounted() {
        // You can access the parameter here if needed
        this.parameter = this.$route.path; // Adjust according to your route
        
        console.log('Navbar mounted with classlength:', this.classlength);
    },
    methods: {
        // Add any methods if needed
        goHome() {
            if(this.classlength === 0) {
                this.$router.push('/tc'); // Redirect to the home page
            } else {
                this.$router.push('/th'); // Redirect to create class page
            }
            
        }
    }
}
</script>
<style scoped>
.in{
    background-color: #4fc4f7;
    color: white;
}
.logo{
    height: 250px;
    width: 100%;
    object-fit: cover;
    margin-top: 0%;
    margin-bottom: 10px;
}
nav {
    min-width: 250px;
    max-width: 250px;
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
    /* color: #4fc4f7; */
    font-weight: bold;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
    transition: 0.3s;
}
.out{
    background-color: transparent;
    color: #4fc4f7;
}
nav ul li:hover{
    transition: 0.3s;
    background-color: #4fc4f7;
    color: white;
}
</style>
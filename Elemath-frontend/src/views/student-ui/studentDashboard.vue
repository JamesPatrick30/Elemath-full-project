<template>
            <div class="nav123">
                <img class="logonav" src="/images/logo.jpg" alt="">
                <button @click="SeeNav()">...</button>
                
            </div>
    <main>
        
        <navBarStudent class="nav" v-if="isNavVisible"></navBarStudent>
        <div class="content">
            
            <div class="info">
                 <h2>{{ name }}</h2>
                 <h4>{{ lrn }}</h4>
            </div>
            <div class="joinQuiz">
                <!-- <TreeComponent class="tree1"/>
                <TreeComponent2 class="tree2"/>
                <img class="frog" src="/images/frog2.png" alt=""> -->
                <h1>JoinQuiz</h1>
            </div>
            <div class="practicecontaner">
                <div class="practice-test">
                    <h2>Practice Test</h2>
                </div>
                <div class="window-card">
                    <h2>Window Card</h2>
                </div>
            </div>
            <div class="did-you-know">
                <h2>Lessons</h2>
                <p>Math is not just about numbers, it's about problem-solving and critical thinking!</p>
            </div>
        </div>
    </main>
</template>
<script>
import navBarStudent from './components/navBarStudent.vue';
import TreeComponent from '@/components/svg/IconTree1.vue';
import TreeComponent2 from '@/components/svg/IconTree2.vue';
import api from '@/axios';
export default {
    name: 'StudentDashboard',
    components: {
        TreeComponent,
        TreeComponent2,
        navBarStudent
    },
    data() {
        return {
            name: 'John Doe', // Replace with actual data
            lrn: '1234567890', // Replace with actual data
            isNavVisible: window.matchMedia('(min-width: 623px)').matches // Responsive nav visibility
        };
    },
    methods: {
        async getdata(){
            try {
                const response = await api.get('/get/student/data'); // Adjust the endpoint as needed
                this.name = response.data.name || 'John Doe';
                this.lrn = response.data.lrn || '1234567890';
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        },
        async lookforQuiz(){
            try{
                const res = await api.post('/get/quiz');
            }catch(err){
                console.error('Error fetching quiz data:', err);
            }
        },
        SeeNav() {
            this.isNavVisible = !this.isNavVisible;
        },
        handleResize() {
            this.isNavVisible = window.matchMedia('(min-width: 623px)').matches;
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        this.getdata();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=BubbleBody+Neue:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');
.logo{
    height: auto;
    width: 100%;
    margin-top: 0%;
    margin-bottom: 10px;
}
.frog{
    position: absolute;
    
    left: 80%;
    height: 200px;
}
main {
    display: flex;
    width: 100%;
    height: 100vh;
    /* background-image: url('/images/bg.png');
    background-size: cover;
    background-position: center;
    background-color: rgba(255, 255, 255, 0.7); */
    /* background-color: #f9f9f9; */
}
main::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/bg.png'); /* Use public/ folder path */
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  z-index: -1;
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
.content{
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    }
.info {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 0;
    margin: 0%;
    padding: 10px;
    background-color:#a8f5ff ;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 90%;
    height: 90px;
    justify-content: center;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
.info h2 {
    margin: 0;
    font-size: 20px;
    color: #333;
}
.info h4 {
    margin: 0;
    font-size: 13px;
    color: #666;
}
.joinQuiz {
    width: 90%;
    height: 200px;
    margin-top: 10px;
    padding: 10px;
    background-color: #a8df60;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
    cursor: pointer;
    transition: 0.3s linear;
}
.joinQuiz:hover{
    background-color: #bbe781;
    transition: 0.3s linear;
    color: #82b342;
}
.joinQuiz .tree1{
    width: 80px;
    height: 90px;
    position: relative;
    left: -270px;
    top: -100px;
}
.joinQuiz .tree2 {
    width: 90px;
    height: 90px;
    position: relative;
    left: -270px;
    top: -100px;
}
.nav123 {
    
    width: 100%;
    height: 5vh;
    margin-top: 0;
    display: none;
    justify-content: left;
    align-items: center;
}
.nav123 button {
    position: relative;
    margin-top: 5px;
    margin-left: 10px;
    width: 30px;
    height: 30px;
    background-color: #4fc4f7;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.practicecontaner {
    width: 90%;
    height: 150px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
.practicecontaner .practice-test {
    background-image: url('/images/btnbg2.png');
    background-size: cover;
    background-position: center;
    width: 45%;
    height: 100%;
    background-color: #dce466;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
}
.practicecontaner .window-card {
    width: 45%;
    height: 100%;
    background-color: #4fc4f7;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
}
.did-you-know {
    width: 90%;
    height: 200px;
    margin-top: 10px;
    padding: 10px;
    background-color: #fde6b3;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
/* @media screen and (max-width: 1024px){
    main{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
        justify-content: center;
        align-items: center;
    }
    .info{
        width: 100%;
        padding: 0;
    }
} */

/* Mobile styles */
@media screen and (max-width: 623px) {
    /* .nav{
    position: absolute;
} */
    main {
        flex-direction: column;
        width: 100vw;
        height: auto;
        min-height: 100vh;
        padding: 0;
    }
    /* nav {
        display: none;
        width: 100vw;
        height: auto;
        margin-top: 0%;
        min-height: 60px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
    }
    nav ul {
        flex-direction: column;
        gap: 10px;
        width: 100vw;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #4fc4f7;
        padding: 5px;
    }
    nav ul li{
        padding: 5px;
        text-align: center;
        justify-content: center;
    }
    nav ul li:hover{
        width: 100%;
        height: 30px;
        
        
        background-color: #4fc4f7;
        color: white;
    } */
    .content {
        width: 100vw;
        padding: 10px 0;
    }
    .info,
    .joinQuiz,
    .practicecontaner,
    .did-you-know {
        width: 96vw;
        min-width: 0;
        margin: 8px auto;
        padding: 10px;
    }
    .joinQuiz {
        flex-direction: column;
        height: auto;
        min-height: 100px;
    }
    .joinQuiz .tree1{
        position: static;
        width: 50px;
        height: 50px;
        margin-right: 70%;
        margin-bottom: 5px;
        left: 0;
        top: 0;
    }
    
    .joinQuiz .tree2 {
        position: static;
        margin-right: 50%;
        width: 40px;
        height: 50px;
        margin-bottom: 5px;
        left: 0;
        top: 0;
    }

    .practicecontaner {
        flex-direction: column;
        height: auto;
        gap: 10px;
    }
    .practicecontaner .practice-test,
    .practicecontaner .window-card {
        width: 100%;
        height: 60px;
    }
    .did-you-know {
        height: auto;
        min-height: 100px;
        color: #333;
    }
    .nav123 {
        display: flex;
        justify-content: end;
        align-items: center;
        width: 100vw;
        /* height: 40px;
        min-height: 40px; */
    }
    .nav123 button {
        margin-right: 20px;
        width: 28px;
        height: 28px;
        font-size: 20px;
        
    }
    .logo{
        display: none;
    }
    .logonav{
        position: absolute;
        left: 2%;
        height: 30px;
    }
}
</style>
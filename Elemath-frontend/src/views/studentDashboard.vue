<template>
            <div class="nav123">
                <button @click="SeeNav()">...</button>
            </div>
    <main>
        
        <nav>
            <ul>
                <li class="item1">Home</li>
                <li class="item2">Profile</li>
                <li class="item3">History</li>
                <li class="item4">Settings</li>
            </ul>
        </nav>
        <div class="content">
            
            <div class="info">
                 <h2>{{ name }}</h2>
                 <h4>{{ lrn }}</h4>
            </div>
            <div class="joinQuiz">
                <TreeComponent class="tree1"/>
                <TreeComponent2 class="tree2"/>
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
                <h2>Did you know?</h2>
                <p>Math is not just about numbers, it's about problem-solving and critical thinking!</p>
            </div>
        </div>
    </main>
</template>
<script>
import TreeComponent from '@/components/svg/IconTree1.vue';
import TreeComponent2 from '@/components/svg/IconTree2.vue';

export default {
    name: 'StudentDashboard',
    components: {
        TreeComponent,
        TreeComponent2
    },
    data() {
        return {
            name: 'John Doe', // Replace with actual data
            lrn: '1234567890' // Replace with actual data
        };
    },
    methods: {
        SeeNav() {
            // Logic to toggle navigation visibility
            const nav = document.querySelector('nav');
            nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
        }
    },
    mounted() {
        
    }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=BubbleBody+Neue:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');
main {
    display: flex;
    width: 100%;
    height: 95vh;
    background-color: #f9f9f9;
}
nav {
    width: 20%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
        font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
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
}
.joinQuiz .tree1{
    width: 70px;
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
    display: flex;
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

</style>
<script>
import navbar from './components/navbar.vue';
export default {
    name: 'quizGrade',
    components: {
        navbar
    },
    data() {
        return {
            classlength: 0
        };
    },
    mounted() {
        // Fetch class length or any other data if needed
        // For example, you might want to fetch the number of classes from an API
        // Here, we will just set it to a static value for demonstration
        this.classlength = 5; // Replace with actual data fetching logic
    }
}
</script>
<template>
    <body>
        <navbar :classlength="classlength"/>
        <div>
            <h1>Quiz Grade</h1>
            <!-- Add your content here -->
        </div>
    </body>
</template>
<style scoped>
body {
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}
</style>
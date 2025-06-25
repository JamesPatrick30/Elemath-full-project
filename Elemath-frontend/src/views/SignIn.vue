<template>
    <h1>Sign In {{ role }}</h1>
</template>
<script>
export default {
    name: 'SignIn',
    data() {
        return {
            role: this.$route.query.role , // Default to 'student' if no role is provided
        };
    },
    methods: {
        // Add methods for handling sign-in logic
    },
    mounted() {
    }
};
</script>
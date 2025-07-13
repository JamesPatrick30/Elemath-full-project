<template>
<div class="body">
    <nav>
        <ul>
            <li>Dashboard</li>
            <li>Create Class</li>
            <li>Manage Classes</li>
            <li>Settings</li>
        </ul>
    </nav>
</div>
</template>
<style scoped>
    .body {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    nav {
        background-color: #333;
        color: white;
        padding: 10px;
    }
    nav ul {
        list-style-type: none;
        padding: 0;
    }
    nav li {
        margin: 5px 0;
    }
</style>
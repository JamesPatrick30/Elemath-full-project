<template>
    <body>
        <navbar></navbar>
        <main>
            <header>
                <h1>Grade</h1>
            </header>
            <div class="table-con">
                
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Quiz 1</th>
                            <th>Quiz 2</th>
                            <th>Quiz 3</th>
                            <th>Quiz 4</th>
                            <th>Quiz 5</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                            <td>8</td>
                            <td>9</td>
                            <td>7</td>
                            <td>10</td>
                            <td>8</td>
                            <td>42</td>
                        </tr>
                        <tr>
                            <td>Jane Smith</td>
                            <td>9</td>
                            <td>8</td>
                            <td>10</td>
                            <td>9</td>
                            <td>7</td>
                            <td>43</td>
                        </tr>
                        <tr>
                            <td>Alex Lee</td>
                            <td>7</td>
                            <td>8</td>
                            <td>9</td>
                            <td>8</td>
                            <td>9</td>
                            <td>41</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </main>

    </body>
</template> 
<script>

import navbar from './components/navbar.vue';
export default{
    components:{
        navbar
    },
    data(){
        return{

        }
    }
}
</script>
<style scoped>
body{
    background-color: rgb(235, 235, 235);
    height: 100vh;
    width: 100vw;
    display: flex;

}
table{
    height: 90%;
    width: 90%;
    background-color: rgb(216, 216, 216);
}
.table-con{
    background-color: aqua;
    height: 90%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
main{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: center;
    justify-content: center; */
}
</style>
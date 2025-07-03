<template>
    <body class="body">
        <nav>
            <ul>
                <li class="item1">Home</li>
                <li class="item2">Profile</li>
                <li class="item3">History</li>
                <li class="item4">Settings</li>
            </ul>
        </nav>
        <main>
            <div class="header">
                <h3>Welcome back, James</h3>
            </div>
            <div class="contaner">
                <div class="item1" id="item">
                    <select name="" id="">
                        <option value="756">Section-Red</option>
                        <option value="757">Section-Green</option>
                        <option value="758">Section-Yellow</option>
                        <option value="759">Section-Blue</option>
                        <option value="760">Section-Purple</option>
                    </select>
                </div>
                <div class="item2" id="item">

                </div>
                <div class="item3" id="item" >
                    <h3>students</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Average</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="student in students" :key="student.name" class="li-st">
                                <td class="td-1st">{{ student.name }}</td>
                                <td>{{ student.average }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="item4" id="item"></div>
            </div>
            
        </main>
    </body>
</template>
<script>
export default{
    data(){
        return{
            students: [
                { name: "Alice", average: 85.2 },
                { name: "Bob", average: 92.5 },
                { name: "Charlie", average: 78.9 },
                { name: "Diana", average: 88.7 },
                { name: "Ethan", average: 95.1 },
                { name: "Fiona", average: 81.3 },
                { name: "George", average: 76.4 },
                { name: "Hannah", average: 89.9 },
                { name: "Ian", average: 84.6 },
                { name: "Julia", average: 91.2 },
                { name: "Kevin", average: 79.8 },
                { name: "Laura", average: 87.5 },
                { name: "Mike", average: 90.3 },
                { name: "Nina", average: 83.7 },
                { name: "Oscar", average: 77.2 },
                { name: "Paula", average: 86.8 },
                { name: "Quentin", average: 80.5 },
                { name: "Rachel", average: 93.4 },
                { name: "Sam", average: 82.1 },
                { name: "Tina", average: 88.0 }
            ].sort((a, b) => b.average - a.average)
        }
    }
}
</script>
<style scoped>
*{
    color: #464c84;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
td{
    text-align: center;
    margin-top: 8px;
    padding: 8px;
    border-top: 2px solid #f9f9f9;
}
.li-st{
    margin-top: 4px;
    border-top: 2px solid #464c84;
    

}
.item3{
    overflow: hidden;
    /* max-height: 350px; /* Adjust as needed 
    scroll-behavior: none; */
}
.item3 table {
    width: 100%;
    border-collapse: collapse;
}

.item3 tbody {
    display: block;
    max-height: 250px; /* Adjust as needed */
    overflow-y: auto;
    width: 100%;
}

.item3 thead, .item3 tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
}
.item3 table{
    width: 100%;
    
}
.contaner .item1 select{
    all: unset;

}
.body{
    height: 100vh;
    width: 100%;
    background-color: #c25252;
    display: flex;
    flex-direction: row;
}
nav{
    height: 100%;
    background-color: antiquewhite;
    width: 15%;
}
main{
    height: 100%;
    width: 100%;
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.contaner{
    height: 90%;
    width: 90%;
    display: grid;
    grid-template-rows: 20% 70%;
    grid-template-columns: 2fr 3fr;
    grid-area: 
        'item1 item2'
        'item3 item4';
        gap: 30px;
}
#item{
    background-color: white;
    box-shadow: 0 6px 16px rgba(0, 0, 3, 0.15);
    border-radius: 20px;
}
.header{
    height: 10%;
    width: 100%;
    display: flex;
    text-align: center;

}
.header h3{
    margin-left: 30px;
}
</style>
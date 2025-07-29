<template>
    <body>
        <navbar></navbar>
        <main>
            <header>
                <h1>Grade</h1>
            </header>
            <div class="table-con">
                <!-- TODO: create better table -->
                 <div class="table">
                    <div class="thead">
                        <div class="th-name" @click="add()"><h3>Name</h3></div>
                        <div class="th-con">
                            <div class="th"></div>
                        </div>
                    </div>
                    <div class="tbody">
                        <div class="tr" v-for="student in students" :key="student.name">
                            <div class="td-name">{{ student.name }}</div>
                            <div class="td-con">
                                <div class="td" v-for="grade in gradeline(student.quiz)"><p>{{ grade }}</p> </div>
                            </div>
                            <div class="td-total"><p>{{ average(student.quiz) }}</p></div>
                        </div>
                    </div>
                 </div>
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
            students:[
                { lrn: 256548512374, name: 'Sanchez, James Patrick L.', quiz: [20, 50, 80, 43, 12, 53, 60, 72, 55, 48, 67] },
                { lrn: 256548512375, name: 'Reyes, Maria Clara', quiz: [75, 60, 85, 90, 70, 88, 92, 81, 77, 85, 90] },
                { lrn: 256548512376, name: 'Dela Cruz, Juan', quiz: [65, 70, 80, 60, 55, 77, 69, 73, 68, 71, 75] },
                { lrn: 256548512377, name: 'Garcia, Ana', quiz: [90, 92, 88, 85, 91, 89, 94, 96, 93, 95, 97] },
                { lrn: 256548512378, name: 'Torres, Miguel', quiz: [55, 60, 58, 62, 59, 61, 64, 66, 63, 65, 67] },
                { lrn: 256548512379, name: 'Lopez, Carla', quiz: [80, 85, 78, 82, 79, 81, 84, 86, 83, 85, 87] },
                { lrn: 256548512380, name: 'Ramos, Paolo', quiz: [70, 75, 72, 68, 74, 73, 76, 78, 75, 77, 79] },
                { lrn: 256548512381, name: 'Cruz, Angelica', quiz: [88, 90, 85, 87, 89, 86, 91, 93, 90, 92, 94] },
                { lrn: 256548512382, name: 'Santos, Mark', quiz: [60, 65, 63, 67, 62, 66, 69, 71, 68, 70, 72] },
                { lrn: 256548512383, name: 'Flores, Bianca', quiz: [95, 98, 97, 96, 99, 94, 100, 99, 98, 97, 96] },
                { lrn: 256548512384, name: 'Mendoza, Carlo', quiz: [50, 55, 53, 57, 52, 56, 59, 61, 58, 60, 62] },
                { lrn: 256548512385, name: 'Gutierrez, Liza', quiz: [85, 80, 83, 82, 81, 84, 87, 89, 86, 88, 90] },
                { lrn: 256548512386, name: 'Navarro, Kevin', quiz: [77, 79, 75, 78, 76, 80, 83, 85, 82, 84, 86] },
                { lrn: 256548512387, name: 'Castro, Julia', quiz: [68, 70, 72, 69, 71, 73, 76, 78, 75, 77, 79] },
                { lrn: 256548512388, name: 'Villanueva, Paolo', quiz: [82, 84, 83, 81, 85, 80, 87, 89, 86, 88, 90] },
                { lrn: 256548512389, name: 'Morales, Erika', quiz: [73, 75, 74, 76, 72, 77, 80, 82, 79, 81, 83] },
                { lrn: 256548512390, name: 'Fernandez, John', quiz: [66, 68, 67, 65, 69, 70, 73, 75, 72, 74, 76] },
                { lrn: 256548512391, name: 'Diaz, Patricia', quiz: [91, 93, 92, 90, 94, 95, 98, 100, 97, 99, 96] },
                { lrn: 256548512392, name: 'Bautista, Simon', quiz: [58, 60, 59, 61, 57, 62, 65, 67, 64, 66, 68] },
                { lrn: 256548512393, name: 'Aguilar, Rose', quiz: [87, 89, 88, 86, 90, 85, 92, 94, 91, 93, 95] }
            ],
            line:0
        }
    },
    methods:{
        gradeline(grades){
            const list = [];
            let i = this.line;
            for( i ; i < this.line + 5 && i < grades.length; i++){
                list.push(grades[i]);
            }
            console.log('line : '+i +' Student : '+(grades.length-4));
            return list;
        },
        add(){
            if(this.line < (this.students[0].quiz.length - 5)){
                 
                this.line++;
            }
            // console.log('line : '+this.line +' Student : '+(this.students[0].quiz.length - 4));
            
        },
        average(grades){
            let Total = 0;
            for(let grade of grades){
                Total += grade;
            }
            const average = (Total / grades.length).toFixed(2);
            return average;
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
    overflow: hidden;

}
.tbody{
    height: calc(100% - 50px);
    overflow: auto;
    scrollbar-width: none;
    width: 100%;
    background-color: aqua;
}
.td-total{
    width: 50px;
}
.td{
    min-width: 50px;
    width: 100%;
    height: 48px;
    border: 1px solid black;
}
.tr,.thead{display: flex;}
.td-con,.th-con{
    display: flex;
    height: 50px;
    width:calc(100% - 450px);
    border: 1px solid black;
}
.th-name,.td-name{
    height: 50px;
    width: 400px;
    text-align: center;
    border: 1px solid black;
}
th,td{
    outline: auto;
}
.table{
    
    border: 1px solid black;
    height: 90%;
    width: 90%;
    /* background-color: rgb(216, 216, 216); */
}
.table-con{
    /* background-color: aqua; */
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
<script>
import greenbg from '@/views/student-ui/components/greenbg.vue';
export default {
    name: "WindowCard",
    components: {
        greenbg
    },
    data() {
        return {
            source: [1, 2, 3, 4, 5,6,7,8,9,10,8,1,2,3,7,6,7]
        }
    }
}
</script>
<template>
    <greenbg/>
    <body>
        <main>
            <div class="con">
                <div class="setting-con">
                    <h1>Window Card</h1>
                    <div class="settings">
                        <label for="time">Time:</label>
                        <input class="input-s" type="number" id="time" v-model="time" placeholder="Minutes"/>
                        <label for="questionNumber">Questions</label>
                        <input class="input-s" type="number" id="questionNumber" v-model="questionNumber" placeholder="Number of Questions"/>
                        <label for="difficulty">Difficulty:</label>
                        <select class="input-s" id="difficulty" v-model="difficulty">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <label for="operation">Operations</label>
                        <select class="input-s" name="operation" id="operation" v-model="operation">
                            <option value="addition">Addition</option>
                            <option value="subtraction">Subtraction</option>
                            <option value="multiplication">Multiplication</option>
                            <option value="division">Division</option>
                        </select>
                    </div>
                </div>
                <div class="players-con">
                    <div class="player" v-for="value in source" :key="value">{{ value }}</div>
                </div>
            </div>
        </main>
    </body>
</template>
<style scoped>
*{
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
.input-s{
    outline: none;
    width: 200px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #a8e15e;
    padding: 5px;
    margin: 10px 0;
}
.settings{
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.player:hover{
    transform: scale(1.02);
}
.player{
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06),
                0 4px 8px rgba(16, 24, 40, 0.08),
                0 12px 20px rgba(16, 24, 40, 0.08);
}
.players-con{
    padding-bottom: 20px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    /* background-color: red; */
}
main{
    width: 100%;
    height: 100vh;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: red; */
}
.setting-con{
    box-shadow:
        0 1px 2px rgba(16, 24, 40, 0.06),
        0 4px 8px rgba(16, 24, 40, 0.08),
        0 12px 20px rgba(16, 24, 40, 0.08);
    border-radius: 10px;
    margin-top: 20px;
    background-color: white;
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.con{
    /* background-color: white; */
    height: 100%;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
}
@media screen and (max-width: 768px) {
    .con {
        width: 90%;
    }
}
</style>
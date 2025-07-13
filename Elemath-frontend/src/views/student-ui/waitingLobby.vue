<script>
export default {
    name: 'waitingLobby',
    data() {
        return {
            students: [
                { name: 'John Doe', lrn: '123456789' },
                { name: 'Jane Smith', lrn: '987654321' },
                { name: 'Alice Johnson', lrn: '456789123' },
                { name: 'Bob Brown', lrn: '321654987' },
                { name: 'Charlie White', lrn: '789123456' },
                { name: 'Diana Green', lrn: '654321789' },
                { name: 'Ethan Blue', lrn: '159753486' },
                { name: 'Fiona Black', lrn: '753159852' },
                { name: 'George Red', lrn: '852963741' },
                { name: 'Hannah Yellow', lrn: '963852741' },
                { name: 'Ian Purple', lrn: '741258963' },
                { name: 'Julia Orange', lrn: '258369147' },
                { name: 'Kevin Pink', lrn: '369147258' },
                { name: 'Laura Cyan', lrn: '147258369' },
                { name: 'Mike Gray', lrn: '258741963' },
                { name: 'Nina Violet', lrn: '369852147' },
                { name: 'Oscar Teal', lrn: '852147963' },
                { name: 'Paula Maroon', lrn: '963741852' },
                { name: 'Quinn Gold', lrn: '741963258' },
                { name: 'Rita Silver', lrn: '258963147' },
                { name: 'Sam Bronze', lrn: '369258741' },
                { name: 'Tina Copper', lrn: '147369852' },
                { name: 'Ursula Steel', lrn: '258147963' },
                { name: 'Victor Brass', lrn: '369852741' },
                { name: 'Wendy Zinc', lrn: '852963147' },
                { name: 'Xander Lead', lrn: '963741258' },
                { name: 'Yara Aluminum', lrn: '741258369' },
                { name: 'Zane Nickel', lrn: '258369147' }
            ],
            showInfo: false,
            infoName: 'Patrick',
            infoLrn: '976976986546'
        }
    },
    methods: {
        showInfofunction(student) {
            this.showInfo = true;
            this.infoName = student.name;
            this.infoLrn = student.lrn;
        }
    },
}
</script>
<template>

    <main>
        <header>
            <h1>Waiting for other players to join...</h1>
            <p>Once all players are ready, the game will start.</p>
        </header>
        <div class="contaner">
            <div class="player" v-for="student in students" :key="student.lrn" @click="showInfofunction(student)" >
             
                    <p>{{ student.name }}</p>
                
                

            </div>
        </div>
    </main>
    <div class="con-info" v-if="showInfo">
        <div class="info">
            <div class="con-pic">
                <img class="info-img" src="/images/teach.png" alt="">
            </div>
            <h1>{{ infoName }}</h1>
            <p>Lrn : {{ infoLrn }}</p>
            <button @click="showInfo = false">Close</button>
        </div>
    </div>
</template>
<style scoped>
.info-img{
    width: auto;
    height: 260px;
    border-radius: 50%;
    margin-bottom: 20px;
}
.con-pic{
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-size: cover;
    background-position: center;
}
header h1,
header p{
    margin: 0;
    color: white;
    text-align: center;
}
.info h1,
.info p{
    margin: 0;
}
.info{
    background-color: white;
    text-align: center;
    color: #4fc4f7;
    font-size: 20px;
    font-weight: 600;
    height: 400px;
    width: 400px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    padding: 20px;
    border-radius: 20px;
}
.info button {
    background-color: #4fc4f7;
    width: 100px;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    position: relative;
    align-self: self-end;
}
.con-info{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
}
.player{
    width: 200px;
    height: 100px;
    background-color: #f5d170;
    border-radius: 10px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-size: large;
    font-weight: 700;
    transition: 0.3s;
}
.player:hover{
    background-color: #f5c170;
    transform: scale(1.05);
    cursor: pointer;
    transition: 0.3s;
}
.contaner{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    height: 90%;
    overflow: scroll;
    scrollbar-width: thin;
    scrollbar-color: #4fc4f7 transparent;
}
*{
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    
}
main::before {
    z-index: -1;
    background-image: url('/images/bg.png');
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
}
header{
    
    width: 90%;
    height: 70px;
    background-color: #4fc4f7;
    color: white;
    display: flex;
    gap: 0.1em;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    box-shadow: 0 6px 16px rgba(0, 0, 3, 0.15);
}
@media screen and (max-width: 768px) {
    header {
        width: 95%;
    }
    header h1,
    header p {
        font-size: 1em;
    }
    .contaner {
        grid-template-columns: 1fr 1fr 1fr;
        text-align: center;
        height: 90%;
        overflow: scroll;
    }
    .player {
        width: 90%;
        margin: 10px auto;
    }
    .info {
        width: 70%;
        height: auto;
        padding: 20px;
    }
    
}
</style>
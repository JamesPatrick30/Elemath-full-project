<template>
    <body  v-if="user">
        <navbar :classlength="classlength"></navbar>
        <main>
            <header class="main-header">
                <h4>Settings</h4>
            </header>
            <!-- <section class="basic-info-section" >
                <header class="section-header">Basic Info</header>
                <div class="basic-info">
                    <div class="input-container">
                        <label for="Name">First Name</label>
                        <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="infoName" readonly>
                    </div>
                    <div class="input-container">
                        <label for="Name"> Middle Name</label>
                        <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="infoMiddleName" readonly>
                    </div>
                    <div class="input-container">
                        <label for="Name"> Last Name</label>
                        <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="infoLastName" readonly>
                    </div>
                    <div class="input-container">
                        <label for="Name">Name</label>
                        <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="infoName" readonly>
                    </div>
                    
                </div> -->
                <!-- <div class="update-container">
                    <button class="update-btn" @click="btnBasicInfo()">Update</button>
                </div> -->
            <!-- </section> -->
            <section class="basic-info-section">
                <header class="section-header" >Basic Info</header>
                <div class="basic-info-container">
                    <div class="image-con">
                        <img class="profile-picture" :src="user?.profile" alt="Profile Picture">
                    </div>
                    <div class="basic-info">
                        
                        <div class="input-container">
                            <label for="Name">Full Name</label>
                            <p>{{ user?.username }}</p>
                            <!-- <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="user?.username" readonly> -->
                        </div>
                        <div class="input-container">
                            <label for="Name">Email</label>
                            <p>{{ user?.Email }}</p>
                            <!-- <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="user?.email" readonly> -->
                        </div>
                        <div class="input-container">
                            <label for="Name">First Name</label>
                            <p>{{ user?.firstName }}</p>
                            <!-- <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="user?.firstName" readonly> -->
                        </div>
                        <div class="input-container">
                            <label for="Name"> Middle Name</label>
                            <p>{{ user?.middleName }}</p>
                            <!-- <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="user?.middleName" readonly> -->
                        </div>
                        <div class="input-container">
                            <label for="Name"> Last Name</label>
                            <p>{{ user?.lastName }}</p>
                            <!-- <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="user?.lastName" readonly> -->
                        </div>
                        <div class="input-container">
                            <label for="Name">Class Count</label>
                            <p>{{ user?.class.length }}</p>
                            <!-- <input class="input-basic" type="text" id="Name" placeholder="Name" v-model="user?.lrn" readonly> -->
                        </div>
                        

                    </div>
                </div>
            </section>
            <section class="basic-info-section">
                <header class="section-header">Report a Problem</header>
                <form @submit.prevent="sendBug" class="form-container">
    
            <select v-model="module" class="input">
            <option disabled value="">Select Module</option>
            <option>Quiz</option>
            <option>Profile</option>
            <option>Other</option>
            </select>

            <textarea v-model="description" placeholder="Describe the problem" class="input"></textarea>


            <textarea v-model="suggestion" placeholder="Share your suggestions…" class="input" ></textarea>

            <!-- <input type="file" @change="handleFiles" multiple accept="image/*" /> -->
            <div class="file-upload">
                <label class="upload-btn">
                Select Images
                <input type="file" @change="handleFiles" multiple accept="image/*" />
                </label>
                <!-- <p v-if="files.length">Selected files: {{ files.length }}</p> -->
            </div>

            <div v-if="files.length" class="file-preview">
                Selected screenshots:
                <div class="preview-container">
                    <img v-for="(file, index) in files" 
                        :key="index" 
                        :src="getObjectURL(file)" 
                        :alt="file.name"
                        class="preview-img" />
                </div>
            </div> 

            <button type="submit" class="btn" :style="{ opacity: btnSwitch ? 0.5 : 1 }" :disabled="btnSwitch">Submit</button>
        </form>
            </section>
            <button class="logout" @click="logout()">Logout</button>
        </main>
    </body>
    <loading v-else />
</template>
<script>
import api from '@/axios';
import socket from '@/socket';
import navbar from './components/navbar.vue';
import loading from './components/loading.vue';
export default{
    name: 'Setting',
    components: {
        navbar,
        loading
    },
    data() {
        return {
            btnSwitch: false,
            showInfo: false,
            infoName:'',
            infoMiddleName:'',
            infoLrn: '',
            updateBasicInfo:false,
            user: null,
            name: '',
            classlength:null,
            module: '',
            description: '',
            sudgest:'',
            files: [],
            navshow:false,
            username:'',
            profile:'',
            suggestion:'',
        };
    },
    methods: {
        btnBasicInfo() {
            this.updateBasicInfo = !this.updateBasicInfo;

            const inputFields = document.querySelectorAll('.input-basic');
            inputFields.forEach((input) => {
                if (this.updateBasicInfo) {
                    input.removeAttribute('readonly');
                    input.style.borderBottom = '2px solid #4fc4f7';
                } else {
                    input.setAttribute('readonly', 'readonly');
                    input.style.backgroundColor = 'white';
                    input.style.borderBottom = 'none';
                }
            });
        },
        async logout() {
            try {
                const response = await api.post('/api/logout');
                console.log(response.data.message);

                if (socket.connected) {
                    socket.disconnect();
                    console.log("Socket disconnected on logout");
                }
                this.$router.push('/'); // Redirect to the home page or login page
            } catch (error) {
                console.error('Logout failed:', error);
            }
        },
        async getData() {
            try {
                const res = await api.get('/data/teacher');
                this.user = res.data;
                this.name = this.user?.username;
                // this.infoName = this.user.firstName;
                // this.infoMiddleName = this.user.middleName;
                // this.infoLastName = this.user.lastName;
                // this.classlength = this.user.class.length;
                
                // console.log('Data fetched successfully:', res.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                if(err.response && err.response.status === 401) {
                    this.$router.push('/');
                } else {
                    alert('Failed to fetch data. Please try again later.');
                }
            }
        },
        async refreshtoken(){
            try {
                const res = await api.post('/refresh-token');
                this.user = res.data;
                console.log('Token refreshed successfully:', res.data);
                await this.getData();
            } catch (err) {
                console.error('Error refreshing token:', err);
                if(err.response && err.response.status === 401) {
                    this.$router.push('/');
                } else {
                    alert('Failed to refresh token. Please try again later.');
                }
            }
        },
        async sendBug() {
            if (!this.module || !this.description) {
                alert('⚠️ Module and description are required.');
                return;
            }
            if (this.files.length > 5) {
                alert('⚠️ You can upload up to 5 screenshots only.');
                return;
            }
            this.btnSwitch = true; 
            const formData = new FormData();
            formData.append('name', this.name);
            formData.append('email', this.user?.email || "N/A"); // safer fallback
            formData.append('module', this.module);
            formData.append('suggestion', this.suggestion || ""); // fixed typo: sudgest → suggestion
            formData.append('description', this.description);

            // Attach screenshots
            this.files.forEach(file => formData.append('screenshots', file));

            try {
                const response = await api.post('/report/teacher', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.success) {
                alert('✅ Bug report sent successfully!');
                // Clear form only if success
                this.name = '';
                this.email = '';
                this.module = '';
                this.description = '';
                this.suggestion = '';
                this.files = [];
                } else {
                alert('❌ Error sending bug report.');
                }
            } catch (err) {
                console.error(err);
                alert('🚨 Server error. Please try again later.');
            }
            this.btnSwitch = false;
        },

    
    
    handleFiles(event) {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.length > 5) {
        alert('You can upload up to 5 screenshots only.');
        return;
      }
      this.files = selectedFiles;
    },
    getObjectURL(file) {
      return file ? window.URL.createObjectURL(file) : '';
    },
    },
    mounted() {
        // this.refreshtoken();
        this.getData();
    }
}</script>
<style scoped>
.preview-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.preview-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.file-upload {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  font-family: 'Poppins', sans-serif;
}

.upload-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4fc4f7;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
}

.upload-btn:hover {
  background-color: #3bb0e0;
}

/* Hide the native file input */
.upload-btn input[type="file"] {
  display: none;
}
.form-container {
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.input {
    resize: none;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.file-list {
  font-size: 0.9rem;
  color: #555;
}

.btn {
    font-weight: 600;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049;
}
.image-con{
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden; */
}
.basic-info-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2em;
    /* padding: 10px; */
    height: 100%;
    width: 100%;
}
.profile-picture{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #4fc4f7;
    margin-top: 20px;
}
.input-container p{
    margin: 0;
    padding: 10px 0;
    font-size: 16px;
    font-weight: bold;
    color: #4fc4f7;
}
.input-container {
    display: flex;
    flex-direction: column;
    align-items:baseline;
    justify-content: center;
    width: 60%;
    height: 100%;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
    font-weight: 500;
}
.input-basic:focus {
    outline: none;
}
.input-basic{
    width: 100%;
    height: 20px;
    border-radius: 5px;
    border: none;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #4fc4f7;
    background-color: white;

}
.update-btn{
    margin-right: 15px;
    background-color: #66f861;
    color: white;
    width: 100px;
    height: 40px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    border: none;
}
.update-container{
    display: flex;
    justify-content:end;
    align-items: center;
    margin-top: 20px;
    height: 10px;
}
.basic-info{
    
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-items: center;
    justify-items: center;
    height: 280px;
    width: 100%;
}
.logout{
    background-color: #aa2e2e;
    color: white;
    width: 100px;
    height: 40px;
    border:none;
    border-radius: 20px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    margin: 20px ;
    justify-self: center;
    align-self: center;
}
main .main-header h4 {
    margin: 0;
    padding: 20px;
    color: #3eabda;
    font-size: 24px;
    font-weight: bold;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
main .main-header {
    /* margin: 0; */
    margin-top: 0px;
    text-align: start;
    color: #4fc4f7;
    font-size: 30px;
    font-weight: bold;
}
.basic-info-section {
    background-color: white;
    width: 80%;
    /* height: 400px; */
    border-radius: 10px;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 10px;
    align-self: center;
    justify-self: center;
}
section .section-header {
    background-color: #d9f1fc;
    color: #4fc4f7;
    padding: 20px;
    text-align:left;
    font-size: 24px;
    font-weight: bold;
    padding: 10px;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}

body{
    background-color: rgb(235, 235, 235);
    height: 100vh;
    width: 100vw;
    display: flex;
}
main{
    height: 100%;
    width: 100%;
    /* display:flexbox;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
    overflow: auto;
    scrollbar-width: thin;
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
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.logo{
    height: auto;
    width: 100%;
    margin-top: 0%;
    margin-bottom: 10px;
}
</style>
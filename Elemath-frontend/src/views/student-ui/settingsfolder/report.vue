<template>
    <greenbg></greenbg>
    <body>
        <header>
            <img class="profile" :src="profile" alt="" @click="switchNav">
            <div class="textcon">
                <p class="welcome">Welcome Back!</p>
                    <p class="name">{{ username }}</p>
                
                
            </div>
        </header>
        <form @submit.prevent="sendBug" class="form-container">
    
            <select v-model="module" class="input">
            <option disabled value="">Select Module</option>
            <option>Quiz</option>
            <option>Profile</option>
            <option>Other</option>
            </select>

            <textarea v-model="description" placeholder="Describe the problem" class="input"></textarea>


            <textarea v-model="sudgest" placeholder="Share your suggestions…" class="input" ></textarea>

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

            <button type="submit" class="btn">Report Bug</button>
        </form>
    </body>
    <newnav :info="{name:username,profile:profile}" v-show="navshow"></newnav>


</template>

<script>
import newnav from '../components/newnav.vue';
import greenbg from '../components/greenbg.vue';
import api from '@/axios';
export default {
    components:{
        greenbg,
        newnav
    },
  data() {
    return {
      name: '',
      email: '',
      module: '',
      description: '',
      sudgest:'',
      files: [],
      navshow:false,
      username:'',
      profile:''
    };
  },
  methods: {
    switchNav(){
            this.navshow = !this.navshow;
        },
    // handleFiles(event) {
    //   const selectedFiles = Array.from(event.target.files);
    //   if (selectedFiles.length > 5) {
    //     alert('You can upload up to 5 screenshots only.');
    //     return;
    //   }
    //   this.files = selectedFiles;
    // },
    async sendBug() {
        if (!this.module || !this.description) {
            alert('Module and description are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('module', this.module);
        formData.append('suggestion',this.sudgest);
        formData.append('description', this.description);
        this.files.forEach(file => formData.append('screenshots', file));

        try {
            // const response = await api.post('/report/student', formData, {
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // }
            // });

            // if (response.data.success) {
            alert('Bug report sent successfully!');
            this.name = '';
            this.email = '';
            this.module = '';
            this.description = '';
            this.files = [];
            // } else {
            // alert('Error sending bug report.');
            // }
        } catch (err) {
            console.error(err);
            alert('Server error.');
        }
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
    async getdata(){
        try {
            const response = await api.get('/get/student/data'); // Adjust the endpoint as needed
            // console.log(response.data);
            this.username = response.data.name || 'John Doe';
            this.profile = response.data.profile;
            console.log('Student ID:', response.data);
            await this.lookforQuiz();
            socket.connect();
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
        return;
    }

  },
  mounted(){
    this.getdata();
  }
};
</script>

<style scoped>
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
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.welcome,.name{
    margin: 0;
    padding: 0;
    margin-left: 10px;
}
.welcome{
    font-size: 10px;
        color: rgb(110, 110, 110);

}
.name{
    /* margin: 0; */
    
    font-weight: 700;
    font-size: 15px;
}
.profile{
    height: 50px;
    border-radius: 50%;
}
header{
    padding: 10px;
    /* border-radius: 10px; */
    width: fit-content;
    display: flex;
    /* background-color: white; */
}
body{
    position: absolute;
    z-index: 10;
    
}
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
</style>

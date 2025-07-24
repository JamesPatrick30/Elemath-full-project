<template>
    <div class="cluster-enrolled-con">
        <div class="cluster-enroll">

        </div>
    </div>
    <body>
        <div class="form-con">
            <form @submit.prevent="handleUpload" enctype="multipart/form-data" >
                        <!-- <label for="moduleFile" clnhass="upload-label">
                        📄 Upload Module / Lesson File
                        <input type="file" @change="handleFileChange" accept=".pdf,.xlsx,.xls" required />
                        </label> -->
                        <label for="moduleFile" class="upload-label">
                        📄 Upload Module / Lesson File
                            <input
                                type="file"
                                id="moduleFile"
                                accept=".pdf,.doc,.docx,.txt,.xlsx,.xls"
                                @change="handleFileChange"
                                hidden
                            />
                        </label>
                        <br>
                        <br>
                        <br>
                    <p v-if="filename" class="file-name">Selected: {{ filename }}</p>
                        <!-- <input type="file" @change="handleFileChange" class="upload-label" accept=".pdf,.xlsx,.xls" required /> -->
                        <button type="submit">Upload</button>

                        <div v-if="uploading">
                        Uploading: {{ progress }}%
                        <progress :value="progress" max="100"></progress>
                        </div>
                    </form>
        </div>
    </body>
    
</template>
<script>
// import loading from './components/loading.vue';
// import navbar from './components/navbar.vue';
import api from '@/axios';
export default{
    data(){
        return{
            filename: '',
            selectedFile: null,
            uploading: false,
            progress: 0,
        }
    },
    methods:{
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
            if (event) {
                this.filename = this.selectedFile.name; // ✅ Get the file name
                console.log(this.selectedFile.name);
            }
        },

        async handleUpload() {
            if (!this.selectedFile) {
                alert("Please select a file first.");
                return;
            }

            const formData = new FormData();
            formData.append('file', this.selectedFile);
            formData.append('classId',this.classid);
            this.uploading = true;
            this.progress = 0;

            try {
                const response = await api.post('/uploadlist', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 20000, // ⏳ Increase timeout to 20 seconds
                onUploadProgress: (progressEvent) => {
                    this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
                });
                
                // this.students = response.data;
                console.log('Uploaded students:', response.data);
                if(response.data.message === 'All students are already enrolled'){
                    console.log(response.data.enrolled)
                    return alert(response.data.message);
                }
                // await this.getClassData(this.classid);
            } catch (err) {
                console.error(err);
                
                alert("Upload failed.");
            } finally {
                this.uploading = false;
            }
        }
    }
}
</script>
<style scoped>
.cluster-enrolled-con{
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgb(0, 0, 0,0,5);
    z-index: 1000;
}
body{
    height: 100vh;
    width: 100vw;
    background-image: url('/images/bg.png');
    background-size: cover;
    background-position: center;
    display: flex;
}
.file-name {
  margin-top: 10px;
  font-style: italic;
  color: #333;
}
form{
    display: flex;
    flex-direction: column;
}
.file-name {
  margin-top: 10px;
  font-style: italic;
  color: #333;
}
.file-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.upload-label {
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.upload-label:hover {
  background-color: #0056b3;
}
</style>
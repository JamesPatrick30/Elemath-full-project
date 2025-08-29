<template>
  <form @submit.prevent="sendBug" class="form-container">
    
    <select v-model="module" class="input">
      <option disabled value="">Select Module</option>
      <option>Quiz</option>
      <option>Profile</option>
      <option>Other</option>
    </select>

    <textarea v-model="description" placeholder="Describe the problem" class="input"></textarea>


    <textarea v-model="sudgest" placeholder="Share your suggestions…" class="input"></textarea>

    <input type="file" @change="handleFiles" multiple accept="image/*" />

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
</template>

<script>
import api from '@/axios';
export default {
  data() {
    return {
      name: '',
      email: '',
      module: '',
      description: '',
      sudgest:'',
      files: []
    };
  },
  methods: {
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
            const response = await api.post('/report/student', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            });

            if (response.data.success) {
            alert('Bug report sent successfully!');
            this.name = '';
            this.email = '';
            this.module = '';
            this.description = '';
            this.files = [];
            } else {
            alert('Error sending bug report.');
            }
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
    }

  }
};
</script>

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

.form-container {
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.file-list {
  font-size: 0.9rem;
  color: #555;
}

.btn {
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

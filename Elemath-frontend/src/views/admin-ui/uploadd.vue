<template>
  <div>
    <input type="file" @change="handleFileUpload" :disabled="uploadb"/>
    <button @click="submitFile">Upload Lesson</button>
    <p v-if="uploadResult">Uploaded: {{ uploadResult.title }}</p>
  </div>
  {{ lessons.length }} lessons found.
  <div v-for="value in lessons" :key="value.id" style=" display: flex; flex-direction: column; align-items: center; margin-top: 20px; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
    <!-- <h1>==============================================================================================================================================================</h1> -->
    <!-- <blockquote>{{ value.summary }}</blockquote> -->
    <h3>{{ value.title }}</h3>
    <div v-html="formattedContent(value.htmlLesson)"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "@/axios";

export default {
  name: "UploadLesson",
  setup() {
    const uploadb = ref(false);
    const file = ref(null);
    const uploadResult = ref(null);
    const lessons = ref([]);

    const handleFileUpload = (e) => {
      file.value = e.target.files[0];

      submitFile();
    };

    const submitFile = async () => {
      if (!file.value) {
        alert("Select a file first!");
        return;
      }
      uploadb.value = true;
      try {
        const formData = new FormData();
        formData.append("lessonFile", file.value);

        const response = await api.post("/upload/default", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploadResult.value = response.data;
        console.log("✅ Lesson uploaded:", uploadResult.value);

        // Optionally refresh lessons list
        alert("Upload successful: " + uploadResult.value.title);
        fetchLessons();
      } catch (err) {
        console.error("❌ Upload error:", err);
        alert("Upload failed: " + (err.response?.data?.message || err.message));
      }
      uploadb.value = false;
    };

    const fetchLessons = async () => {
      try {
        const response = await api.get("/dlesson/list");
        lessons.value = response.data || [];
        console.log("Fetched lessons:", lessons.value);
      } catch (err) {
        console.error("Error fetching lessons:", err);
      }
    };

    const formattedContent = (lesson) => {
      return lesson ? lesson.replace(/\n/g, "<br>") : "";
    };

    onMounted(() => {
      fetchLessons();
    });

    return {
      file,
      uploadResult,
      lessons,
      handleFileUpload,
      submitFile,
      formattedContent,
    };
  },
};
</script>

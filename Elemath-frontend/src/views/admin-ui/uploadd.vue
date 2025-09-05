<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <button @click="submitFile">Upload Lesson</button>
    <p v-if="uploadResult">Uploaded: {{ uploadResult.title }}</p>
  </div>

  <div v-for="value in lessons" :key="value.id">
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
    const file = ref(null);
    const uploadResult = ref(null);
    const lessons = ref([]);

    const handleFileUpload = (e) => {
      file.value = e.target.files[0];
    };

    const submitFile = async () => {
      if (!file.value) {
        alert("Select a file first!");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("lessonFile", file.value);

        const response = await api.post("/upload/default", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploadResult.value = response.data;
        console.log("✅ Lesson uploaded:", uploadResult.value);

        // Optionally refresh lessons list
        fetchLessons();
      } catch (err) {
        console.error("❌ Upload error:", err);
        alert("Upload failed: " + (err.response?.data?.message || err.message));
      }
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

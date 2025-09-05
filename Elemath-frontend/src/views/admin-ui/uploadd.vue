<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <button @click="submitFile">Upload Lesson</button>
    <p v-if="uploadResult">Uploaded: {{ uploadResult.title }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "@/axios"; // your existing Axios instance

export default {
  setup() {
    const file = ref(null);
    const uploadResult = ref(null);

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

        uploadResult.value = response.data; // ✅ Access the actual server response
        console.log("✅ Lesson uploaded:", uploadResult.value);
      } catch (err) {
        console.error("❌ Upload error:", err);
        alert("Upload failed: " + (err.response?.data?.message || err.message));
      }
    };

    return { file, uploadResult, handleFileUpload, submitFile };
  },
};
</script>

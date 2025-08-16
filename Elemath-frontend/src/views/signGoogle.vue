<template>
  <div>
    <div id="google-button"></div>
  </div>
</template>

<script setup>
import socket from '@/socket';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/axios'; // Axios instance
import { defineProps } from 'vue';

const props = defineProps({
  someData: String
});

// You can now use props.someData
console.log("Received prop:", props.someData);

const router = useRouter(); // 👈 Vue Router instance

function handleGoogleCredentialResponse(response) {
  const idToken = response.credential;

  api.post('/google', { idToken })
    .then(res => {
      console.log('✅ Login success:', res.data);
      // alert('Login successful!');
      socket.connect();
      if(res.data.class >0) {
        router.push({ name: 'teacher-ui' }); // 👈 Use router here
      }else{
        router.push({ name: 'teacher-create-class' }); // 👈 Use router here
      }
      
    })
    .catch(error => {
      console.error('❌ Login failed:', error.response?.data || error.message);
      alert('Login failed!');
    });
}

function manualLogin() {
  console.log("🔁 manualLogin triggered");
  if (window.google) {
    window.google.accounts.id.prompt(); 
  } else {
    console.warn('Google script not loaded yet.');
  }
}

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_API_GOOGLE,
      callback: handleGoogleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large' }
    );
  };
});

defineExpose({ manualLogin });
</script>

<style scoped>
#google-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: aqua;
}
</style>

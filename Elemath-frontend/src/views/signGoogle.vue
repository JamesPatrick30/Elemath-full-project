<!-- SignGoogle.vue -->
<template>
  <div>
    <div id="google-button"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import api from '@/axios'; // adjust if needed

function handleGoogleCredentialResponse(response) {
  const idToken = response.credential;

  api.post('/google',{
    idToken: response.credential
  }
  )
    .then(res => {
      console.log('✅ Login success:', res.data);
      alert('Login successful!');
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
      client_id: '651051530850-um6g1njmsd7qb1qu56tj5i4843mhkeio.apps.googleusercontent.com',
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

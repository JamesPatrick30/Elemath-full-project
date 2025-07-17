<template>
  <div>
    <!-- This is where the Google Sign-In button will appear -->
    <div id="google-button"></div>
  </div>
</template>

<script>
export default {
  name: 'GoogleLogin',
  mounted() {
    // Attach the callback function to the window so GIS can find it
    window.handleGoogleCredentialResponse = this.handleGoogleCredentialResponse;

    // Dynamically load Google Identity Services (GIS) script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Once the script loads, initialize and render the button
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID_HERE',
        callback: this.handleGoogleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-button'),
        {
          theme: 'outline',
          size: 'large',
        }
      );
    };
  },
  methods: {
    async handleGoogleCredentialResponse(response) {
      const idToken = response.credential;

      try {
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ idToken }),
        });

        const data = await res.json();
        console.log('Login success:', data);
        // Optionally redirect or save user info here
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
};
</script>

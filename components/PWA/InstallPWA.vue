<script setup>
import { ref, onMounted } from 'vue';

const deferredPrompt = ref(null);
const showInstallButton = ref(false);

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log(e);
    e.preventDefault();
    deferredPrompt.value = e;
    showInstallButton.value = true;
  });
});

const installPWA = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    const { outcome } = await deferredPrompt.value.userChoice;
    if (outcome === 'accepted') {
      console.log('PWA yüklendi');
    } else {
      console.log('PWA yükleme reddedildi');
    }
    deferredPrompt.value = null;
    showInstallButton.value = false;
  }
};
</script>

<template>
  button
  <button v-if="showInstallButton" @click="installPWA" class="install-button">
    PWA Yükle
  </button>
</template>

<style scoped>
.install-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.install-button:hover {
  background-color: #0056b3;
}
</style>

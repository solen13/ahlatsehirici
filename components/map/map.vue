<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet-routing-machine';

const map = ref(null);
const userMarker = ref(null);
const destinationMarker = ref(null);

onMounted(() => {
  if (typeof window !== 'undefined') {
    // 🌍 Haritayı oluştur
    map.value = L.map('map').setView([57.74, 11.94], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map.value);

    // 🎯 Varış noktası (Sabit nokta - örnek olarak belirlenmiş)
    const destination = [57.6792, 11.949];

    // 📍 Varış noktası işaretleyicisini ekle
    destinationMarker.value = L.marker(destination)
      .addTo(map.value)
      .bindPopup('Varış Noktası')
      .openPopup();

    // 📌 Kullanıcının konumunu al
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = [
            position.coords.latitude,
            position.coords.longitude,
          ];

          // 👤 Kullanıcının konumunu işaretleyici ile göster
          userMarker.value = L.marker(userLatLng)
            .addTo(map.value)
            .bindPopup('Mevcut Konumunuz')
            .openPopup();

          // 🌍 Haritanın görünümünü kullanıcıya ayarla
          map.value.setView(userLatLng, 13);

          // 🚗 Rota çizme işlemi
          L.Routing.control({
            waypoints: [
              L.latLng(userLatLng), // Kullanıcının konumu
              L.latLng(destination), // Varış noktası
            ],
            routeWhileDragging: true,
            draggableWaypoints: false, // Kullanıcı rota noktalarını değiştiremez
            createMarker: function () {
              return null;
            }, // Varsayılan işaretleyicileri kaldır
          }).addTo(map.value);
        },
        (error) => {
          console.error('Konum alınamadı:', error);
        }
      );
    } else {
      console.error('Tarayıcınız konum özelliğini desteklemiyor.');
    }
  }
});
</script>

<template>
  <div id="map" style="height: 500px"></div>
</template>

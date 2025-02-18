<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet-routing-machine';

const map = ref(null);
const userMarker = ref(null);
const routingControl = ref(null);

const locations = [
  { name: 'Durak 1', coords: [38.75398517875953, 42.49346438892259] },
  { name: 'Durak 2', coords: [38.754059704812725, 42.49787916915966] },
  { name: 'Durak 3', coords: [38.755890157563165, 42.51047359038544] },
];

// 🔹 Özel ikonları oluştur
const userIcon = L.icon({
  iconUrl: '/human.png', // Kullanıcı ikonu
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const stopIcon = L.icon({
  iconUrl: '/durak.png',
  iconSize: [55, 55],
  iconAnchor: [25, 45],
});

onMounted(() => {
  if (typeof window !== 'undefined') {
    // 🌍 Haritayı oluştur
    map.value = L.map('map').setView([57.74, 11.94], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map.value);

    // 📍 Durakları ekle (Stop işareti)
    locations.forEach((location) => {
      const marker = L.marker(location.coords, { icon: stopIcon })
        .addTo(map.value)
        .bindPopup(location.name)
        .on('click', () => updateRoute(location.coords)); // 🔹 Marker'a tıklanınca yeni rota çiz
    });

    // 📌 Kullanıcının konumunu al ve en yakın konuma yönlendir
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = [
            position.coords.latitude,
            position.coords.longitude,
          ];

          // 👤 Kullanıcının konumu (User işareti)
          userMarker.value = L.marker(userLatLng, { icon: userIcon })
            .addTo(map.value)
            .bindPopup('Mevcut Konumunuz')
            .openPopup();

          map.value.setView(userLatLng, 16);

          // 🚗 En yakın durağı bul ve rotayı çiz
          const closestLocation = findClosestLocation(userLatLng);
          updateRoute(closestLocation.coords);
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

// 🔹 Kullanıcıya en yakın durağı bulma fonksiyonu
function findClosestLocation(userLatLng) {
  let minDistance = Infinity;
  let closest = null;

  locations.forEach((location) => {
    const distance = getDistance(userLatLng, location.coords);
    if (distance < minDistance) {
      minDistance = distance;
      closest = location;
    }
  });

  return closest;
}

// 🔹 İki nokta arasındaki mesafeyi hesaplama (Haversine Formülü)
function getDistance(coord1, coord2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Dünya'nın yarıçapı (km)
  const dLat = toRad(coord2[0] - coord1[0]);
  const dLon = toRad(coord2[1] - coord1[1]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1[0])) *
      Math.cos(toRad(coord2[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // km cinsinden mesafe
}

// 🚗 **Rota Güncelleme**
function updateRoute(destination) {
  if (routingControl.value) {
    map.value.removeControl(routingControl.value); // Önceki rotayı kaldır
  }

  routingControl.value = L.Routing.control({
    waypoints: [
      L.latLng(userMarker.value.getLatLng()), // Kullanıcı konumu
      L.latLng(destination), // Yeni varış noktası
    ],
    routeWhileDragging: true,
    draggableWaypoints: false,
    createMarker: function () {
      return null;
    },
  }).addTo(map.value);
}
</script>

<template>
  <div id="map" style="height: 500px"></div>
</template>

<style>
.leaflet-routing-alt {
  display: none !important;
}
</style>

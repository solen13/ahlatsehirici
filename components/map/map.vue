<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet-routing-machine';

const map = ref(null);
const userMarker = ref(null);
const routingControl = ref(null);
const userLocation = ref(null);

const locations = [
  { name: 'Durak 1', coords: [38.75398517875953, 42.49346438892259] },
  { name: 'Durak 2', coords: [38.754059704812725, 42.49787916915966] },
  { name: 'Durak 3', coords: [38.755890157563165, 42.51047359038544] },
];

const userIcon = L.icon({
  iconUrl: '/human.png',
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
    map.value = L.map('map').setView(
      [38.755890157563165, 42.51047359038544],
      14
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map.value);

    locations.forEach((location) => {
      L.marker(location.coords, { icon: stopIcon })
        .addTo(map.value)
        .bindPopup(location.name)
        .on('click', () => updateRoute(location.coords));
    });
  }
});

// function locateUser() {
//   if ('geolocation' in navigator) {
//     navigator.geolocation.watchPosition(
//       (position) => {
//         userLocation.value = [
//           position.coords.latitude,
//           position.coords.longitude,
//         ];

//         if (userMarker.value) {
//           userMarker.value.setLatLng(userLocation.value);
//         } else {
//           userMarker.value = L.marker(userLocation.value, { icon: userIcon })
//             .addTo(map.value)
//             .openPopup();
//         }

//         map.value.setView(userLocation.value, 14);

//         const closestLocation = findClosestLocation(userLocation.value);
//         updateRoute(closestLocation.coords);
//       },
//       (error) => {
//         alert('Konum alınamadı: Lütfen konum izinlerini kontrol edin.');
//         console.error('Konum hatası:', error);
//       },
//       { enableHighAccuracy: true }
//     );
//   } else {
//     alert('Tarayıcınız konum özelliğini desteklemiyor.');
//   }
// }

let firstUpdate = true;

function locateUser() {
  if ('geolocation' in navigator) {
    function updateLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userLocation.value = [
            position.coords.latitude,
            position.coords.longitude,
          ];

          if (userMarker.value) {
            userMarker.value.setLatLng(userLocation.value);
          } else {
            userMarker.value = L.marker(userLocation.value, { icon: userIcon })
              .addTo(map.value)
              .openPopup();
          }

          // İlk konum alındığında haritayı merkeze al
          if (firstUpdate) {
            map.value.setView(userLocation.value, 14);
            firstUpdate = false;
          } else {
            map.value.flyTo(userLocation.value, 14, { duration: 10.5 });
          }

          const closestLocation = findClosestLocation(userLocation.value);
          updateRoute(closestLocation.coords);
        },
        (error) => {
          alert('Konum alınamadı: Lütfen konum izinlerini kontrol edin.');
          console.error('Konum hatası:', error);
        },
        { enableHighAccuracy: true }
      );
    }

    // İlk konumu hemen al
    updateLocation();

    // Sonraki konumları 2 dakikada bir güncelle
    setInterval(updateLocation, 120000);
  } else {
    alert('Tarayıcınız konum özelliğini desteklemiyor.');
  }
}

function findClosestLocation(userLatLng) {
  let minDistance = Infinity;
  let closest = null;

  locations.forEach((location) => {
    const distance = getDistance(userLatLng, location.coords);
    console.log(`Mesafe: ${distance} km - ${location.name}`);
    if (distance < minDistance) {
      minDistance = distance;
      closest = location;
    }
  });
  return closest;
}

function getDistance(coord1, coord2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(coord2[0] - coord1[0]);
  const dLon = toRad(coord2[1] - coord1[1]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1[0])) *
      Math.cos(toRad(coord2[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function updateRoute(destination) {
  if (routingControl.value) {
    map.value.removeControl(routingControl.value);
  }

  routingControl.value = L.Routing.control({
    waypoints: [L.latLng(userMarker.value.getLatLng()), L.latLng(destination)],
    routeWhileDragging: true,
    draggableWaypoints: false,
    createMarker: () => null,
  }).addTo(map.value);
}
</script>

<template>
  <div class="mt-10 container mx-auto">
    <h2 class="font-bold text-center text-xl py-2 bg-orange-50">
      En Yakın Durağı Bul
    </h2>
    <button
      @click="locateUser"
      class="bg-blue-400 text-white rounded px-6 py-1 my-6 font-bold"
    >
      Konumunu Bul
    </button>
    <div id="map" class="z-10" style="height: 70vh"></div>
  </div>
</template>

<style>
.leaflet-routing-alt {
  display: none !important;
}
</style>

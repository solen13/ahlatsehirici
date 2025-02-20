<template>
  <div class="h-screen w-full bg-slate-800 fixed top-0 z-50">
    <div class="flex justify-between container mx-auto items-center p-1">
      <h2 class="text-white font-bold text-xl">{{ name }} Dolmuş Güzergahı</h2>
      <button
        class="text-bold text-2xl text-white bg-red-600 rounded-full py-2 px-3"
        @click="close"
      >
        <Icon name="material-symbols:close-rounded" size="26" class="mt-2" />
      </button>
    </div>

    <div class="flex justify-center p-2">
      <button
        class="bg-green-500 flex items-center justify-between text-white py-2 px-4 rounded"
        @click="showLocation"
      >
        Konumunu Bul
        <Icon name="system-uicons:location" class="ml-2" size="26" />
      </button>
    </div>

    <div id="map" style="height: 90vh"></div>
  </div>
</template>

<script setup>
import busCordinateList from '../../constants/cordinate';

import L from 'leaflet';
import 'leaflet-routing-machine';

const props = defineProps({
  id: {
    type: Number,
    default: null,
  },
  name: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['path']);
const close = () => {
  emit('path', null);
};

const map = ref(null);
const userMarker = ref(null);

const busRoute = computed(() => busCordinateList[props.id]);
console.log(busRoute.value.cordinateList);

onMounted(() => {
  if (typeof window !== 'undefined') {
    map.value = L.map('map').setView(
      [38.755890157563165, 42.51047359038544],
      14
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map.value);

    const routeLine = L.polyline(busRoute.value.cordinateList, {
      color: 'blue',
      weight: 4,
      opacity: 0.7,
    }).addTo(map.value);

    map.value.fitBounds(routeLine.getBounds());
  }
});

const showLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (userMarker.value) {
          map.value.removeLayer(userMarker.value);
        }
        userMarker.value = L.marker([latitude, longitude], {
          icon: L.icon({
            iconUrl: '/human.png',
            iconSize: [38, 38],
          }),
        })
          .addTo(map.value)
          .openPopup();
        map.value.setView([latitude, longitude], 14);
      },
      () => {
        alert('Konum alınamadı! Lütfen izin verin.');
      }
    );
  } else {
    alert('Tarayıcınız konum servislerini desteklemiyor.');
  }
};
</script>

<style></style>

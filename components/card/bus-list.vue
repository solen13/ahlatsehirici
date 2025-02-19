<template>
  <div class="w-full flex ga gap-3 flex-wrap mx-auto container">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Şehir içi ismi ile arayın..."
      class="w-full p-2 shadow-md rounded mb-4 mt-3"
    />
    <div class="w-full p-2 rounded mb-4 text-center text-2xl font-black">
      {{ time }}
    </div>
    <div
      v-for="(item, index) in filteredBusTimes"
      :key="index"
      class="w-full md:w-[270px] shadow-md rounded"
    >
      <h2 class="text-center text-xl font-bold mt-1 capitalize">
        {{ item.busName }}
      </h2>

      <div class="mt-4">
        <div class="flex justify-around mb-2">
          <span>Kalkış Saati</span>
          <span>Dönüş Saati</span>
        </div>
        <ul>
          <li
            v-for="times in item.time"
            class="flex justify-around py-1 border-t border-[#E6E6E6]"
          >
            <span
              :class="{
                'bg-[#CC0002] animate-pulse rounded-md text-white':
                  times.departureActive,
              }"
              class="px-2"
            >
              {{ times.departureTime }}
            </span>
            <span
              class="px-2"
              :class="{
                'bg-[#CC0002] animate-pulse rounded-md text-white':
                  times.returnActive,
              }"
            >
              {{ times.retunTime }}
            </span>
          </li>
          <li class="flex justify-center">
            <button
              @click="pathBtn(item.id)"
              class="bg-slate-800 px-4 rounded text-white mx-auto"
            >
              Güzergahı
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['path']);
const searchQuery = ref('');
const busTimes = ref([
  {
    id: '1',
    busName: 'Tunus, toki, hastane',
    time: [
      {
        departureTime: '19:28',
        retunTime: '07:40',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '20:10',
        retunTime: '02:03',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '10:16',
        retunTime: '19:34',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '11:14',
        retunTime: '11:40',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '12:14',
        retunTime: '19:40',
        departureActive: false,
        returnActive: false,
      },
    ],
  },
  {
    id: '2',
    busName: 'Uludere, kamping, hastane',
    time: [
      {
        departureTime: '19:28',
        retunTime: '07:40',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '09:14',
        retunTime: '20:20',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '10:16',
        retunTime: '19:34',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '11:14',
        retunTime: '11:40',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '12:14',
        retunTime: '19:40',
        departureActive: false,
        returnActive: false,
      },
    ],
  },
  {
    id: '3',
    busName: 'Kırklar ,taş ocağı ',
    time: [
      {
        departureTime: '19:28',
        retunTime: '07:40',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '09:14',
        retunTime: '09:40',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '10:16',
        retunTime: '19:34',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '11:14',
        retunTime: '11:40',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '12:14',
        retunTime: '20:20',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '22:18',
        retunTime: '23:26',
        departureActive: false,
        returnActive: false,
      },
    ],
  },
  {
    id: '4',
    busName: 'eyiler, müze, hastane',
    time: [
      {
        departureTime: '20:20',
        retunTime: '07:40',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '09:14',
        retunTime: '09:40',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '10:16',
        retunTime: '19:34',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '11:14',
        retunTime: '11:40',
        departureActive: false,
        returnActive: false,
      },
      {
        departureTime: '12:14',
        retunTime: '19:40',
        departureActive: false,
        returnActive: false,
      },
    ],
  },
]);
const time = ref('');

const filteredBusTimes = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return busTimes.value.filter((bus) =>
    bus.busName.toLowerCase().includes(query)
  );
});

function updateBusTimes() {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  // Saat ve dakikayı iki basamağa tamamlamak için padStart kullanıyoruz
  const formattedHours = String(currentHours).padStart(2, '0');
  const formattedMinutes = String(currentMinutes).padStart(2, '0');

  time.value = `${formattedHours} : ${formattedMinutes}`;

  busTimes.value.forEach((bus) => {
    bus.time.forEach((time) => {
      const [departureHours, departureMinutes] = time.departureTime
        .split(':')
        .map(Number);
      const departureTimeInMinutes = departureHours * 60 + departureMinutes;
      const [returnHours, returnMinutes] = time.retunTime
        .split(':')
        .map(Number);
      const returnTimeInMinutes = returnHours * 60 + returnMinutes;

      time.departureActive =
        currentTimeInMinutes >= departureTimeInMinutes &&
        currentTimeInMinutes < departureTimeInMinutes + 5;
      time.returnActive =
        currentTimeInMinutes >= returnTimeInMinutes &&
        currentTimeInMinutes < returnTimeInMinutes + 5;
    });
  });
}

const pathBtn = (id) => {
  emit('path', id);
};

onMounted(() => {
  setInterval(updateBusTimes, 1000);
});
</script>

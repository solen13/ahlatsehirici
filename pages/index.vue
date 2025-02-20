<template>
  <div class="relative">
    <nav-bar />

    <bus-list class="mt-10" @path="handlePath"></bus-list>
    <ClientOnly>
      <bus-route-modal
        v-if="isModalID != null"
        @path="handlePath"
        :id="isModalID"
        :name="modalName"
      />
    </ClientOnly>

    <ClientOnly>
      <Map />
    </ClientOnly>
  </div>
</template>
<script setup>
const isModalID = ref(null);
const modalName = ref(null);
const handlePath = (event, name) => {
  modalName.value = name;
  isModalID.value = event;
};
</script>

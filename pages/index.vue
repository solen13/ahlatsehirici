<template>
  <div class="relative">
    <nav-bar />
    <bus-list class="mt-10"></bus-list>
    <bus-route-modal v-if="false" />
    <ClientOnly>
      <Map />
    </ClientOnly>
  </div>
</template>

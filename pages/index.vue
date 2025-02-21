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
useSeoMeta({
  ogTitle: () => 'Ahlat Belediyesi Şehiriçi Dolmuş Saatleri',
  title: () => 'Ahlat Belediyesi Şehiriçi Dolmuş Saatleri',
  ogDescription: () =>
    'Ahlat Belediyesi şehiriçi dolmuş saatleri ve dolmuş durak konum bilgilerine ulaşabilirsiniz',
  description: () =>
    'Ahlat Belediyesi şehiriçi dolmuş saatleri ve dolmuş durak konum bilgilerine ulaşabilirsiniz',
  ogImageUrl: () => 'https://ahlat-sehirici.netlify.app/ahlatbelediyelogo.png',
  twitterCard: () => 'summary_large_image',
  twitterTitle: () => 'Ahlat Belediyesi Şehiriçi Dolmuş Saatleri',
  twitterDescription: () =>
    'Ahlat Belediyesi şehiriçi dolmuş saatleri ve dolmuş durak konum bilgilerine ulaşabilirsiniz',
  twitterImage: () =>
    'https://ahlat-sehirici.netlify.app/ahlatbelediyelogo.png',
});
</script>

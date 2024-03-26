<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="bg-black flex-1 py-4">
    <div class="container mx-auto flex justify-between">
      <img width="133" height="29" src="@/assets/img/logo.webp" alt="Instituto Água viva">
      <div class="flex items-center justify-start">
        <a href="/" class="text-white mr-4">Início</a>
        <a href="/info" class="text-white mr-4">Informações</a>
        <a href="/como-doar" class="text-white">Como doar</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

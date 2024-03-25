<template>
  <div class="template-default flex flex-col">
    <header-menu />
    <div class="container mx-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import HeaderMenu from '@/components/HeaderMenu.vue';
</script>

<style lang="scss" scoped>
.template-default {
  flex-direction: column;
}
</style>

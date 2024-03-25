<template>
  <div class="template-default flex flex-column">
    <HeaderMenu />
    <slot></slot>
  </div>
</template>

<script setup>
import HeaderMenu from '@/components/HeaderMenu.vue';
</script>

<style lang="scss" scoped>
.template-default {}
</style>

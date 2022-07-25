<template>
  <ALayout class="h-full">
    <Header />
    <ALayoutContent>
      <div class="layout-content">
        <Navigates />
        <slot />
      </div>
    </ALayoutContent>
  </ALayout>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Navigates from './Navigates.vue'
</script>

<style>
.layout-content {
  @apply relative  mx-auto p-4 h-full w-full md:w-10/12 lg:w-9/12 xl:w-1/3 overflow-hidden;
}
</style>

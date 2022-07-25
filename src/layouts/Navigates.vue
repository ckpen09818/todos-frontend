<template>
  <div class="flex justify-center items-center gap-4 p-4">
    <router-link to="/calendar">Calender</router-link>
    <router-link :to="todoPath">MY DAY</router-link>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
const todoPath = `/todo/${dayjs().format('YYYYMMDD')}`
</script>

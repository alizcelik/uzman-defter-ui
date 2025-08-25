<template>
  <div>
    <h1>Home Page</h1>
  </div>
</template>
<script setup lang="ts">
import { usePageStore } from '@/stores/page'

usePageStore().pageData.title = 'Home Page'
</script>
<style lang=""></style>

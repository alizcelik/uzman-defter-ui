<template>
  <div>
    <h1>404 Not Found</h1>
    <p>Path: {{ route.path }}</p>
    <RouterLink to="/">Go to Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const params = route.params as { slug: string }
</script>

<template>
  <div>
    <h1>Project {{ params.slug }}</h1>
  </div>
</template>

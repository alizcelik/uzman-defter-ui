<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const params = route.params as { id: string | number }
</script>

<template>
  <div>
    <h1>Project {{ params.id }}</h1>
  </div>
</template>

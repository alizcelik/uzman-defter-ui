<template>
  <div>
    <h1>Single Project Page: {{ route.params.id }}</h1>
    <RouterLink to="/projects">Back to Projects</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang=""></style>

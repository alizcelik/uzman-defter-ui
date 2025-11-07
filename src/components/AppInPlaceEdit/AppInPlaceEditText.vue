<template>
  <input
    type="text"
    v-model="value"
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    @blur="$emit('commit')"
    @keypress.enter="($event.target as HTMLInputElement).blur()"
  />
</template>
<script setup lang="ts">
defineEmits(['commit'])

const value = defineModel()
</script>

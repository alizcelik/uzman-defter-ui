<template>
  <textarea
    type="text"
    v-model="value"
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    @blur="$emit('commit')"
  />
</template>
<script setup lang="ts">
defineEmits(['commit'])

const value = defineModel<string>()
</script>

<template>
  <div class="text-2xl cursor-pointer" @click="toggleValue">
    <Transition mode="out-in">
      <iconify-icon
        icon="lucide:circle-check"
        v-if="value === 'in-progress'"
        class="text-green-500"
      />
      <iconify-icon
        icon="lucide:circle-dot"
        v-else-if="value === 'completed'"
        class="text-gray-500"
      />
    </Transition>
  </div>
</template>
<script setup lang="ts">
const value = defineModel<'in-progress' | 'completed'>()

const emit = defineEmits(['commit'])

const { readonly = false } = defineProps<{
  readonly?: boolean
}>()

const toggleValue = () => {
  if (readonly) return
  if (value.value === 'in-progress') {
    value.value = 'completed'
  } else {
    value.value = 'in-progress'
  }
  emit('commit')
}
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.2s;
}
.v-enter-from,
.v-leave-to {
  transform: scale(0.4);
}
</style>

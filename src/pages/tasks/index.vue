<template>
  <div
    style="
      flex: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    "
  >
    <h1>tasks Page</h1>
    <RouterLink to="/">Go to Home</RouterLink>

    <p v-if="!tasks">Loading tasks...</p>
    <ul v-else>
      <li v-for="task in tasks" :key="task.id">
        <p :to="{ name: '/tasks/[id]', params: { id: task.id } }">{{ task.name }}</p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'

const tasks = ref<Tables<'tasks'>[] | null>(null)
;(async () => {
  const { data, error } = await supabase.from('tasks').select('*')
  if (error) {
    console.error('Error fetching tasks:', error)
  } else {
    console.log('tasks:', data)
    tasks.value = data
  }
})()
</script>
<style lang=""></style>

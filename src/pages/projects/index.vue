<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }">Go to Project 1</RouterLink>
    <p v-if="!projects">Loading projects...</p>
    <ul v-else>
      <li v-for="project in projects" :key="project.id">
        <RouterLink :to="{ name: '/projects/[id]', params: { id: project.id } }">{{
          project.name
        }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'

const projects = ref<Tables<'projects'>[] | null>(null)
;(async () => {
  const { data, error } = await supabase.from('projects').select('*')
  if (error) {
    console.error('Error fetching projects:', error)
  } else {
    console.log('Projects:', data)
    projects.value = data
  }
})()
</script>
<style lang=""></style>

<template>
  <div>
    <DataTable v-if="projects" :columns="projectColumns" :data="projects"> </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { usePageStore } from '@/stores/page'
import { projectsQuery, type Projects } from '../../utils/supaQueries'
import { projectColumns } from '../../utils/tableColumns/projectColumns'

usePageStore().pageData.title = 'Projects'
const projects = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error } = await projectsQuery
  if (error) {
    console.error('Error fetching projects:', error)
  } else {
    projects.value = data
  }
}

await getProjects()
</script>

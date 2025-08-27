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
import { useErrorStore } from '@/stores/error'

usePageStore().pageData.title = 'Projects'
const projects = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error, status } = await projectsQuery
  if (error) {
    console.error('Error fetching projects:', error)
    useErrorStore().setError({ error, customCode: status })
  } else {
    projects.value = data
  }
}

await getProjects()
</script>

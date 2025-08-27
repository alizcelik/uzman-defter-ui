<template>
  <DataTable v-if="tasks?.length" :columns="taskColumns" :data="tasks" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { usePageStore } from '@/stores/page'
import { tasksWithProjectsQuery, type TasksWithProjects } from '../../utils/supaQueries'
import { taskColumns } from '../../utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<TasksWithProjects | null>(null)
const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery
  if (error) {
    console.error('Error fetching tasks:', error)
  } else {
    console.log('tasks:', data)
    tasks.value = data
  }
}

await getTasks()
</script>

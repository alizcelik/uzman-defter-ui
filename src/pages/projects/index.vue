<template>
  <div>
    <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects"> </DataTable>
  </div>
</template>
<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { usePageStore } from '@/stores/page'
import { projectColumns } from '../../utils/tableColumns/projectColumns'
import { useProjectsStore } from '@/stores/loaders/projects'
import { storeToRefs } from 'pinia'
import { useCollabs } from '@/composables/collabs'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()
getGroupedCollabs(projects.value ?? [])
console.log('groupedCollabs', groupedCollabs.value)

const columnsWithCollabs = projectColumns(groupedCollabs)
</script>

<script setup lang="ts">
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { profilesQuery, projectsQuery } from '@/utils/supaQueries'
import { ref } from 'vue'
const sheetOpen = defineModel<boolean>()

interface NewTaskForm {
  taskTitle?: string
  taskDescription?: string
  dueDate?: string
}

type SelectOption = { label: string; value: number | string }

const selectOptions = ref({
  projects: [] as SelectOption[],
  profiles: [] as SelectOption[],
})

const getProjectsOptions = async () => {
  const { data: allProjects } = await projectsQuery

  if (!allProjects) return

  allProjects.forEach((project) => {
    selectOptions.value.projects.push({
      label: project.name,
      value: project.id,
    })
  })
}

const getProfilesOptions = async () => {
  const { data: allProfiles } = await profilesQuery

  if (!allProfiles) return

  allProfiles.forEach((profile) => {
    selectOptions.value.profiles.push({
      label: profile.full_name,
      value: profile.id,
    })
  })
}

const createTask = (data: NewTaskForm) => {
  console.log('Form submitted with data:', data)
  // Here you can handle the form submission, e.g., send data to an API
  sheetOpen.value = false // Close the sheet after submission
}
const getOptions = async () => {
  await Promise.all([getProjectsOptions(), getProfilesOptions()])
}

getOptions()
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>

      <FormKit type="form" @submit="createTask" submit-label="Create Task">
        <FormKit type="text" name="name" id="name" label="Name" placeholder="My new task" />
        <FormKit
          type="select"
          name="for"
          id="for"
          label="For"
          placeholder="Select a user"
          :options="selectOptions.profiles"
        />
        <FormKit
          type="select"
          name="project"
          id="project"
          label="Porject"
          placeholder="Select a project"
          :options="selectOptions.projects"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Task description"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>

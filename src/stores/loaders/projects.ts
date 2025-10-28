import { type Projects, projectsQuery } from '@/utils/supaQueries'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useErrorStore } from '../error'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects>([])
  const loadProjects = useMemoize(async (key: string) => {
    void key // to avoid unused variable warning
    return await projectsQuery
  })

  const validateCache = () => {
    projectsQuery.then(({ data, error }) => {
      if (JSON.stringify(data) === JSON.stringify(projects.value)) {
        console.log('Projects cache is valid, no update needed.')
        return
      } else if (!error) {
        console.log('Projects cache is outdated, updating store.')
        projects.value = data
      }
    })
  }

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    if (data) projects.value = data
    validateCache()
  }

  return {
    projects,
    getProjects,
  }
})

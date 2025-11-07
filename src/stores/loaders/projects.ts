import {
  type Project,
  projectQuery,
  type Projects,
  projectsQuery,
  updateProjectQuery,
} from '@/utils/supaQueries'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useErrorStore } from '../error'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)

  const loadProjects = useMemoize(async (key: string) => {
    void key // to avoid unused variable warning
    return await projectsQuery
  })

  const loadProject = useMemoize(async (slug: string) => {
    return await projectQuery(slug)
  })

  interface ValidateCacheParams {
    ref: typeof projects | typeof project
    query: typeof projectsQuery | typeof projectQuery
    key: string
    loaderFn: typeof loadProjects | typeof loadProject
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          console.log('Cache is valid, no update needed.')
        } else {
          loaderFn.delete(key)
          if (!error && data) {
            console.log('Cache is outdated, updating store.')
            ref.value = data
          }
        }
      })
    }
  }

  const getProjects = async () => {
    projects.value = null // Reset projects to trigger loading state

    const { data, error, status } = await loadProjects('projects')

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    if (data) projects.value = data
    validateCache({ ref: projects, query: projectsQuery, key: 'projects', loaderFn: loadProjects })
  }

  const getProject = async (slug: string) => {
    project.value = null // Reset project to trigger loading state

    const { data, error, status } = await loadProject(slug)
    if (error) {
      console.error('Error fetching project:', error)
      useErrorStore().setError({ error, customCode: status })
    }
    if (data) project.value = data

    validateCache({ ref: project, query: projectQuery, key: slug, loaderFn: loadProject })
  }

  const updateProject = async () => {
    if (!project.value) return

    const { tasks, id, ...projectProperties } = project.value
    void tasks
    console.log('Updating project with id:', id, 'Properties:', projectProperties)
    await updateProjectQuery(projectProperties, id)
  }

  return {
    projects,
    getProjects,
    project,
    getProject,
    updateProject,
  }
})

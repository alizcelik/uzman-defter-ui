import type { CustomError, CustomPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomPostgrestError | CustomError>(null)
  const isCustomError = ref(false)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error
    customCode?: number
  }) => {
    if (typeof error === 'string') isCustomError.value = true

    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? Error(error) : error
      activeError.value.customCode = customCode || 500
      return
    }

    // If error has 'hint' property, it's likely a PostgrestError
    if ('hint' in error) {
      activeError.value = error
      ;(activeError.value as CustomPostgrestError).statusCode = customCode
      return
    }
  }

  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }

  return {
    activeError,
    setError,
    isCustomError,
    clearError,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}

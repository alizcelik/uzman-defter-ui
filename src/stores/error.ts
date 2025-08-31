import type { CustomError, CustomPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomPostgrestError | CustomError>(null)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error
    customCode?: number
  }) => {
    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? Error(error) : error
      activeError.value.customCode = customCode || 500
      return
    } else {
      activeError.value = error
      activeError.value.statusCode = customCode
    }
  }

  return {
    activeError,
    setError,
  }
})

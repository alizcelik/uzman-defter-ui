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
    error: string | PostgrestError
    customCode: number
  }) => {
    if (typeof error === 'string') {
      activeError.value = Error(error)
      activeError.value.customCode = customCode
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

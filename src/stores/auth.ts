import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/types'
import { profilesQuery } from '@/utils/supaQueries'
import { supabase } from '@/lib/supabaseClient'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<User | null>(null)
  const profile = ref<null | Tables<'profiles'>>(null)

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data, error } = await profilesQuery(user.value.id)
      if (error) {
        console.error('Error fetching profile:', error)
        profile.value = null
        return
      }
      profile.value = data
      console.log('Profile fetched successfully:', data)
    }
  }

  const setAuth = async (userSession: null | Session = null) => {
    console.log('Setting auth session:', userSession)
    if (userSession) {
      user.value = userSession.user
      await setProfile()
    } else {
      user.value = null
      return
    }
  }

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()
    if (data.session?.user) {
      setAuth(data.session)
    }
  }

  return { user, profile, setAuth, getSession }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}

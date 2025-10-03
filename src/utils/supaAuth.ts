import { supabase } from '@/lib/supabaseClient'

import type { LoginForm, RegisterForm } from '@/types/AuthForm'

export const register = async (formData: RegisterForm) => {
  const { email, password, username, firstName, lastName } = formData
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    console.error('Error signing up:', error)
    return { error }
  }

  console.log('User signed up successfully:', data)

  if (data.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      username,
      full_name: `${firstName} ${lastName}`,
    })
    if (profileError) {
      console.error('Error creating profile:', profileError)
      return { error: profileError }
    }
  }

  // if (data.session) {
  //   // Save the session to local storage or a cookie
  //   localStorage.setItem('userSession', JSON.stringify(data.session))
  // }

  if (!data.user) {
    return false
  }

  return true
}

export const login = async (formData: LoginForm) => {
  const { email, password } = formData
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    console.error('Error logging in:', error)
    return { error }
  }

  console.log('User logged in successfully:', data)

  if (!data.user) {
    return false
  }

  return true
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error logging out:', error)
    return { error }
  }

  console.log('User logged out successfully')
  return true
}

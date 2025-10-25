export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()

  if (!trimmedEmail) return []

  const errors = []

  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/

  const isValid = emailRegex.test(trimmedEmail)

  if (!isValid) {
    errors.push('Not a valid email address.')
  }
  return errors
}

export const validatePassword = (password: string) => {
  const trimmedPassword = password.trim()

  if (!trimmedPassword) return []

  const errors = []

  if (trimmedPassword.length < 6) {
    errors.push('Password must be at least 6 characters long.')
  }
  return errors
}

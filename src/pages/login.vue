<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import { Separator } from '@/components/ui/separator'
import { login } from '@/utils/supaAuth'
import { useRouter } from 'vue-router'
import { useFormErrors } from '@/composables/formErrors'
import { watchDebounced } from '@vueuse/core'
import { ref } from 'vue'

const { serverError, handleServerError, realTimeErrors, handleLoginForm } = useFormErrors()

const formData = ref({
  email: '',
  password: '',
})
const router = useRouter()

watchDebounced(
  formData,
  () => {
    handleLoginForm(formData.value)
  },
  { debounce: 1000, deep: true },
)

const signIn = async () => {
  const { error } = await login(formData.value)
  if (!error) {
    router.push('/')
  } else {
    handleServerError(error)
  }
}
</script>

<template>
  <div class="mx-auto flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]">
    <Card class="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>

        <form class="grid gap-4" @submit.prevent="signIn">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
              :class="{ 'border-red-600': serverError }"
            />
            <ul class="text-sm text-red-600 mb-2" v-if="realTimeErrors?.email.length">
              <li v-for="error in realTimeErrors.email" :key="error">{{ error }}</li>
            </ul>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a href="#" class="inline-block ml-auto text-xs underline"> Forgot your password? </a>
            </div>
            <Input
              id="password"
              type="password"
              autocomplete
              required
              v-model="formData.password"
              :class="{ 'border-red-600': serverError }"
            />
          </div>
          <ul class="text-sm text-red-600 mb-2" v-if="realTimeErrors?.password.length">
            <li v-for="error in realTimeErrors.password" :key="error">{{ error }}</li>
          </ul>
          <ul class="text-sm text-red-600 mb-2" v-if="serverError">
            <li>{{ serverError }}</li>
          </ul>
          <Button type="submit" class="w-full"> Login </Button>
        </form>
        <div class="mt-4 text-sm text-center">
          Don't have an account?
          <RouterLink to="/register" class="underline"> Register </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

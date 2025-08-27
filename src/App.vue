<script setup lang="ts">
import AuthLayout from '@/components/layout/main/AuthLayout.vue'
import { useErrorStore } from './stores/error'
import AppErrorPage from './components/apperror/AppErrorPage.vue'
import { storeToRefs } from 'pinia'

const { activeError } = storeToRefs(useErrorStore())
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>

        <template #fallback>
          <span>Loading ..</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>

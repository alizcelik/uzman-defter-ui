<script setup lang="ts">
import AppNewTask from '@/components/AppNew/AppNewTask.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import TopNavbar from '@/components/layout/TopNavbar.vue'
import { usePageStore } from '@/stores/page'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { pageData } = storeToRefs(usePageStore())
const taskSheetOpen = ref(false)
</script>

<template>
  <Sidebar @taskClicked="taskSheetOpen = true" />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavbar />
    <AppNewTask v-model="taskSheetOpen" />

    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
      </div>
      <slot />
    </main>
  </div>
</template>

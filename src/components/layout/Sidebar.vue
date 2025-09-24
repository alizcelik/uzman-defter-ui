<script setup lang="ts">
import SidebarLinks from './SidebarLinks.vue'
import { Button } from '@/components/ui/button'

const links = [
  { title: 'Dashboard', path: '/', icon: 'lucide:house' },
  { title: 'Projects', path: '/projects', icon: 'lucide:building-2' },
  { title: 'My Tasks', path: '/tasks', icon: 'lucide:badge-check' },
]

const accountLinks = [
  { title: 'Profile', path: '/profile', icon: 'lucide:user' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings' },
  { title: 'Sign out', icon: 'lucide:log-out' },
]

const executeAction = (action: string) => {
  if (action === 'Sign out') {
    // Handle sign out logic here
    console.log('Signing out...')
  } else {
    console.log(`Action clicked: ${action}`)
  }
}
</script>
<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:plus"></iconify-icon>
      </Button>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="accountLinks" @action-clicked="executeAction" />
      </div>
    </nav>
  </aside>
</template>

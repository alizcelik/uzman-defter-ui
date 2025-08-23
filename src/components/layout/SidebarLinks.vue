<template>
  <RouterLink
    v-for="link in props.links"
    :key="link.title"
    :to="link.path"
    class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
    exactActiveClass="text-primary bg-muted"
  >
    <iconify-icon :icon="link.icon"></iconify-icon>
    <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
interface LinkProp {
  title: string
  path: string
  icon: string
}

const props = defineProps<{
  links: LinkProp[]
}>()
</script>

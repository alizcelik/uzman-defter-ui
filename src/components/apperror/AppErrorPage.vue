<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useErrorStore } from '@/stores/error'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const errorStore = useErrorStore()

const error = ref(errorStore.activeError)

const message = ref('')
const customCode = ref(0)
const details = ref('')
const code = ref('')
const hint = ref('')
const statusCode = ref(0)

if (error.value && !('code' in error.value)) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}

if (error.value && 'code' in error.value) {
  message.value = error.value.message
  details.value = error.value.details ?? ''
  code.value = error.value.code ?? ''
  hint.value = error.value.hint ?? ''
  statusCode.value = error.value.statusCode ?? 0
}

router.afterEach(() => {
  errorStore.activeError = null
})
</script>

<template>
  <section class="error">
    <div>
      <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
      <h1 class="error__code">{{ customCode || code }}</h1>
      <p class="error__code" v-if="statusCode">Status Code: {{ statusCode }}</p>
      <p class="error__msg">{{ message }}</p>
      <p v-if="details">Details: {{ details }}</p>
      <p v-if="hint">Hint: {{ hint }}</p>
      <div class="error-footer">
        <p class="error-footer__text">You'll find lots to explore on the home page.</p>
        <RouterLink to="/">
          <Button class="max-w-36"> Back to homepage </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";

.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

.error__icon {
  @apply text-7xl;
  color: var(--destructive);
}

.error__code {
  @apply font-extrabold text-7xl;
  color: var(--secondary);
}

.error__msg {
  @apply text-3xl font-extrabold;
  color: var(--primary);
}

.error-footer {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

.error-footer__text {
  @apply text-lg;
  color: var(--muted-foreground);
}

p {
  @apply my-2;
}
</style>

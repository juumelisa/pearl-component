
<template>
  <main class="p-8 min-h-screen bg-[#1e1e1e] text-white font-mono">
    <div class="max-w-xl mx-auto">
      <h1 class="text-xl mb-4 font-semibold">Code Editor Style Example</h1>
      <div class="relative w-auto">
        <div
          v-html="html"
          class="w-full rounded-lg overflow-hidden shadow-lg border border-gray-700"
        >
        </div>
        <button class="absolute top-5 right-5">
          <Icon name="ic:baseline-content-copy" class="text-xl" />
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useHighlight } from '~/composables/useHighlight'

const code = `
  npm install pearl signature

`

const html = ref('')
onMounted(async () => {
  html.value = await useHighlight(code, 'js')
})
</script>

<style scoped>
div[v-html] {
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>

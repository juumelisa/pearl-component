<template>
  <div class="w-full min-h-screen flex flex-col justify-center items-center gap-5">
    <h1 class="text-5xl lg:text-7xl font-semibold">Pearl Signature</h1>
    <div class="w-full max-w-lg text-center">
      <p>A lightweight Vue 3 component that provides a responsive {{ canvas }} for signatures.</p>
    </div>
    <div
      class="border rounded flex justify-center items-center p-3 gap-5"
      v-bind:class="{
        'border-green-600': isCopied,
        'border-gray-200': !isCopied
      }">
      <span>>_</span>
      <span>npm install pearl-signature</span>
      <div
        v-if="isCopied"
        class="flex justify-center items-center">
        <Icon name="ic:baseline-check" class="text-green-600 text-xl" />
      </div>
      <button
        v-else
        @click="copyCommand"
        class="cursor-pointer flex justify-center items-center">
        <Icon name="ic:baseline-content-copy" class="text-xl" />
      </button>
    </div>
    <a href="/docs/installation" class="bg-green-600 text-white rounded px-8 py-3">Get Started</a>
  </div>
</template>

<script setup lang="ts">
const canvas = ref<string>("<canvas>")
const isCopied = ref<boolean>(false)

const copyCommand = async () => {
  try {
    await navigator.clipboard.writeText('npm install pearl-signature')
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 3000)
  } catch {
    alert('Copy failed')
  }
}
</script>
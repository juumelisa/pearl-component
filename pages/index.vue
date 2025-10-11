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
    <!-- <a href="/docs/installation" class="bg-green-600 text-white rounded px-8 py-3">Get Started</a> -->
    <div class="w-full flex flex-col justify-center items-center">
      <div class="w-[500px] h-[300px] border border-gray-200">
        <Signature
          ref="signatureRef"
          :hide-action-button="false"
          responsive
          :hide-input-file="true"
          placeholder="draw your signature"
        />
      </div>
      <button @click="downloadImage" class="bg-green-600 text-white px-5 py-2 rounded mt-3">Download</button>
      </div>
  </div>
</template>

<script setup lang="ts">
const canvas = ref<string>("<canvas>")
const isCopied = ref<boolean>(false)
import { Signature } from 'pearl-signature'
import 'pearl-signature/dist/pearl-signature.css'


type SignatureType = {
  clearCanvas: () => void;
  undo: () => void;
  redo: () => void;
  getBlob: () => Promise<Blob | null>;
  applyImageToCanvas: (imageUrl: string) => Promise<void>;
}

const signatureRef = ref<SignatureType | null>(null)

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


const downloadImage = async () => {
  const blob = await signatureRef.value?.getBlob()
  if (blob) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'signature.png'
    a.click()
    URL.revokeObjectURL(url)
  }
}
const onChangeFile = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  console.log(e)
  if (file){
    const imageUrl = URL.createObjectURL(file)
    await signatureRef.value?.applyImageToCanvas(imageUrl)
    URL.revokeObjectURL(imageUrl);
  }
}
</script>
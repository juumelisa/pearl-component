<template>
  <div class="w-96 h-60 flex flex-col">
  <Signature ref="signatureRef" :hide-action-button="true" responsive />
  <!-- <div>
    <button @click="undoSign">My Undo Button</button>
  </div> -->
  <button @click="downloadImage">Download</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Signature } from 'pearl-signature'
import 'pearl-signature/dist/pearl-signature.css'

type SignatureType = {
  clearSignature: () => void;
  undo: () => void;
  redo: () => void;
  getBlob: () => void;
}
const signatureRef = ref<SignatureType | null>(null)

const undoSign = () => {
  signatureRef.value?.undo()
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
</script>
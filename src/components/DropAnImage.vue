<template>
  <div class="main">
    <div
      class="dropzone-container"
      @dragover.prevent="dragover"
      @dragleave="dragleave"
      @drop.prevent="drop"
    >
      <input
        type="file"
        multiple
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <label for="fileInput" class="file-label">
        <div v-if="isDragging">Release to drop files here.</div>
        <div v-else>Drop files here or <u>click here</u> to upload.</div>
      </label>
    </div>
    <div v-for="(item, index) in files" :key="index">
      <img :src="item" alt="" srcset="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isDragging = ref(false);
const files = ref<string[]>([]);

const onChange = () => {
  if (fileInput.value && fileInput.value.files) {
    const selectedFiles = Array.from(fileInput.value.files) as File[];
    // Assuming you want to store the URL of the selected images
    selectedFiles.forEach(file => {
      const url = URL.createObjectURL(file);
      files.value.push(url);
    });
    console.log('this.files', files.value);
  }
};

const dragover = (e: DragEvent) => {
  isDragging.value = true;
  e.preventDefault();
};

const dragleave = () => {
  isDragging.value = false;
};

const drop = (e: DragEvent) => {
  e.preventDefault();
  console.log(e.dataTransfer);
  
  if (fileInput.value) {
    const dataTransferFiles = e.dataTransfer?.files;
    if (dataTransferFiles) {
      fileInput.value.files = dataTransferFiles;
      onChange();
      isDragging.value = false;
    }
  }
};

const fileInput = ref<HTMLInputElement | null>(null);
</script>

<style scoped>
/* Your component styles go here */
</style>

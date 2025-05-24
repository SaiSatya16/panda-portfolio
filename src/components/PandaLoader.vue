<template>
  <div class="panda-loader" v-if="loading">
    <div class="panda-container">
      <div class="panda-face">
        <div class="panda-ear left"></div>
        <div class="panda-ear right"></div>
        <div class="panda-head">
          <div class="panda-eye left"></div>
          <div class="panda-eye right"></div>
          <div class="panda-nose"></div>
        </div>
      </div>
      <div class="loading-text">{{ loadingText }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const loadingText = ref('Loading...')

const loadingTexts = [
  'Feeding the pandas...',
  'Climbing bamboo trees...',
  'Taking a power nap...',
  'Gathering bamboo...',
  'Almost ready!'
]

onMounted(() => {
  let textIndex = 0
  const textInterval = setInterval(() => {
    loadingText.value = loadingTexts[textIndex]
    textIndex = (textIndex + 1) % loadingTexts.length
  }, 800)

  setTimeout(() => {
    loading.value = false
    clearInterval(textInterval)
  }, 3000)
})
</script>

<style scoped>
.panda-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.panda-container {
  text-align: center;
  color: white;
}

.panda-face {
  position: relative;
  animation: pandaBounce 2s ease-in-out infinite;
}

.panda-head {
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
  position: relative;
  margin: 20px auto;
}

.panda-ear {
  width: 30px;
  height: 30px;
  background: #1a1a1a;
  border-radius: 50%;
  position: absolute;
  top: -10px;
}

.panda-ear.left {
  left: 15px;
}

.panda-ear.right {
  right: 15px;
}

.panda-eye {
  width: 15px;
  height: 15px;
  background: #1a1a1a;
  border-radius: 50%;
  position: absolute;
  top: 25px;
}

.panda-eye.left {
  left: 20px;
}

.panda-eye.right {
  right: 20px;
}

.panda-nose {
  width: 8px;
  height: 8px;
  background: #1a1a1a;
  border-radius: 50%;
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
}

.loading-text {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 500;
}
</style>

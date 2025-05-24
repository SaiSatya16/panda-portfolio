<template>
  <div class="panda-floating" :style="floatingStyle">
    <div 
      class="panda-character"
      :class="{ 'panda-wiggle': isWiggling }"
      @click="wiggle"
    >
      {{ emoji }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  emoji: { type: String, default: '🐼' },
  size: { type: String, default: '60px' },
  initialX: { type: Number, default: 100 },
  initialY: { type: Number, default: 100 }
})

const x = ref(props.initialX)
const y = ref(props.initialY)
const isWiggling = ref(false)

const floatingStyle = computed(() => ({
  position: 'fixed',
  left: `${x.value}px`,
  top: `${y.value}px`,
  fontSize: props.size,
  cursor: 'pointer',
  zIndex: 100,
  userSelect: 'none',
  transition: 'all 0.3s ease'
}))

const wiggle = () => {
  isWiggling.value = true
  setTimeout(() => {
    isWiggling.value = false
  }, 1000)
}

onMounted(() => {
  // Random floating movement
  setInterval(() => {
    x.value = Math.random() * (window.innerWidth - 100)
    y.value = Math.random() * (window.innerHeight - 100)
  }, 8000)
})
</script>

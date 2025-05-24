<template>
  <section class="hero-section" :style="sectionStyles">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title" :style="titleStyles">
          <span class="wave" @click="triggerWave" ref="waveElement">👋</span>
          Hi, I'm {{ portfolioData.personal.name }}
        </h1>
        <h2 class="hero-subtitle" :style="subtitleStyles">
          {{ portfolioData.personal.title }}
        </h2>
        <p class="hero-description" :style="descriptionStyles">
          {{ portfolioData.personal.bio }}
        </p>
        <div class="hero-actions">
          <n-button 
            type="primary" 
            size="large" 
            @click="scrollToSection('contact')"
            :style="primaryButtonStyles"
            class="connect-btn"
          >
            <template #icon>
              <span>🐼</span>
            </template>
            Let's Connect
          </n-button>
          <n-button 
            size="large" 
            @click="scrollToSection('projects')"
            :style="secondaryButtonStyles"
            class="work-btn"
          >
            <template #icon>
              <span>🚀</span>
            </template>
            View My Work
          </n-button>
        </div>
        
        <!-- Social Links -->
        <div class="social-links">
          <a 
            href="https://github.com/SaiSatya16" 
            target="_blank" 
            class="social-link"
            :style="socialLinkStyles"
            @mouseenter="wiggleSocial('github')"
          >
            <span class="social-icon" :class="{ 'wiggling': wigglingIcon === 'github' }">🐱</span>
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/sai-satya-jonnalagadda-157900225/" 
            target="_blank" 
            class="social-link"
            :style="socialLinkStyles"
            @mouseenter="wiggleSocial('linkedin')"
          >
            <span class="social-icon" :class="{ 'wiggling': wigglingIcon === 'linkedin' }">💼</span>
            LinkedIn
          </a>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="panda-scene">
          <div 
            class="main-panda panda-float"
            @click="rotatePandaEmoji"
            :title="'Click me to change! Current: ' + currentEmoji"
          >
            {{ currentEmoji }}
          </div>
          <div class="bamboo">🎋</div>
          <div class="floating-elements">
            <span 
              class="element" 
              v-for="(item, index) in floatingItems" 
              :key="index"
              @click="celebrateElement(index)"
              :class="{ 'celebrating': celebratingElements.includes(index) }"
            >
              {{ item }}
            </span>
          </div>
          
          <!-- Interactive coding scene -->
          <div class="coding-elements">
            <div class="code-line" :style="{ color: pandaColors.primary }">
              {{ currentCodeLine }}
            </div>
            <div class="cursor-blink" :style="{ backgroundColor: pandaColors.primary }"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="scroll-indicator" :style="{ color: pandaColors.textSecondary }">
      <div class="scroll-text">Scroll to explore</div>
      <n-icon size="24" class="bounce-animation">
        <ChevronDown />
      </n-icon>
    </div>
    
    <!-- Floating particles for extra magic -->
    <div class="magic-particles">
      <span v-for="i in 8" :key="i" class="particle" :style="getParticleStyle(i)">✨</span>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NButton, NIcon } from 'naive-ui'
import { ChevronDown } from 'lucide-vue-next'
import { usePandaTheme } from '../../composables/usePandaTheme'
import { portfolioData } from '../../data/portfolio'

const { pandaColors, currentEmoji, rotatePandaEmoji } = usePandaTheme()

// Reactive data
const floatingItems = ref(['💻', '🚀', '⚡', '🎯', '🌟'])
const celebratingElements = ref([])
const wigglingIcon = ref('')
const waveElement = ref(null)
const currentCodeLine = ref('')
const codeLines = [
  'const developer = "Sai Satya";',
  'const passion = "Full Stack Development";',
  'const skills = ["Vue.js", "Python", "AI/ML"];',
  'const motto = "Code like a panda 🐼";',
  'console.log("Let\'s build amazing things!");'
]
let codeInterval = null
let currentLineIndex = 0

// Computed styles for theme reactivity
const sectionStyles = computed(() => ({
  backgroundColor: pandaColors.value.background,
  color: pandaColors.value.text
}))

const titleStyles = computed(() => ({
  background: `linear-gradient(135deg, ${pandaColors.value.primary}, ${pandaColors.value.secondary})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}))

const subtitleStyles = computed(() => ({
  color: pandaColors.value.textSecondary
}))

const descriptionStyles = computed(() => ({
  color: pandaColors.value.textSecondary
}))

const primaryButtonStyles = computed(() => ({
  backgroundColor: pandaColors.value.primary,
  borderColor: pandaColors.value.primary,
  color: pandaColors.value.background
}))

const secondaryButtonStyles = computed(() => ({
  backgroundColor: 'transparent',
  borderColor: pandaColors.value.border,
  color: pandaColors.value.text
}))

const socialLinkStyles = computed(() => ({
  color: pandaColors.value.textSecondary,
  borderColor: pandaColors.value.border
}))

// Functions
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const triggerWave = () => {
  if (waveElement.value) {
    waveElement.value.style.animation = 'none'
    setTimeout(() => {
      waveElement.value.style.animation = 'wave 1.5s ease-in-out'
    }, 10)
  }
}

const celebrateElement = (index) => {
  if (!celebratingElements.value.includes(index)) {
    celebratingElements.value.push(index)
    setTimeout(() => {
      celebratingElements.value = celebratingElements.value.filter(i => i !== index)
    }, 1000)
  }
}

const wiggleSocial = (platform) => {
  wigglingIcon.value = platform
  setTimeout(() => {
    wigglingIcon.value = ''
  }, 600)
}

const getParticleStyle = (index) => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  animationDelay: `${index * 0.5}s`,
  color: pandaColors.value.primary
})

const startCodeAnimation = () => {
  codeInterval = setInterval(() => {
    currentCodeLine.value = codeLines[currentLineIndex]
    currentLineIndex = (currentLineIndex + 1) % codeLines.length
  }, 3000)
}

const stopCodeAnimation = () => {
  if (codeInterval) {
    clearInterval(codeInterval)
    codeInterval = null
  }
}

// Lifecycle
onMounted(() => {
  // Start animations
  setTimeout(() => {
    triggerWave()
  }, 1000)
  
  setTimeout(() => {
    startCodeAnimation()
  }, 2000)
  
  // Auto-rotate panda emoji every 5 seconds
  setInterval(() => {
    rotatePandaEmoji()
  }, 5000)
})

onUnmounted(() => {
  stopCodeAnimation()
})
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  align-items: center;
  z-index: 10;
}

.hero-text {
  animation: slideInLeft 1s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
}

/* Enhanced Wave Animation */
.wave {
  display: inline-block;
  font-size: 3.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  transform-origin: 70% 70%;
  animation: wave 2.5s ease-in-out infinite;
  animation-delay: 1s;
  transition: transform 0.2s ease;
}

.wave:hover {
  transform: scale(1.1);
}

@keyframes wave {
  0%, 60%, 100% { 
    transform: rotate(0deg); 
  }
  10%, 30% { 
    transform: rotate(14deg); 
  }
  20% { 
    transform: rotate(-8deg); 
  }
  40% { 
    transform: rotate(14deg); 
  }
  50% { 
    transform: rotate(-4deg); 
  }
}

.hero-subtitle {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.connect-btn,
.work-btn {
  transition: all 0.3s ease;
  font-weight: 600;
}

.connect-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.work-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border: 1px solid;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.social-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.social-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.social-icon.wiggling {
  animation: pandaWiggle 0.6s ease-in-out;
}

.hero-visual {
  animation: slideInRight 1s ease-out;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.panda-scene {
  position: relative;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-panda {
  font-size: 8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.main-panda:hover {
  transform: scale(1.1) rotate(5deg);
}

.bamboo {
  position: absolute;
  font-size: 3rem;
  bottom: 0;
  right: 20px;
  animation: pandaFloat 4s ease-in-out infinite;
  animation-delay: 1s;
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.element {
  position: absolute;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: pandaFloat 4s ease-in-out infinite;
  user-select: none;
}

.element:hover {
  transform: scale(1.2);
}

.element.celebrating {
  animation: celebration 1s ease-in-out;
}

@keyframes celebration {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.3) rotate(10deg); }
  50% { transform: scale(1.5) rotate(-10deg); }
  75% { transform: scale(1.2) rotate(5deg); }
}

.element:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
.element:nth-child(2) { top: 20%; right: 10%; animation-delay: 1s; }
.element:nth-child(3) { bottom: 30%; left: 20%; animation-delay: 2s; }
.element:nth-child(4) { bottom: 20%; right: 30%; animation-delay: 3s; }
.element:nth-child(5) { top: 50%; left: 5%; animation-delay: 4s; }

.coding-elements {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  opacity: 0.8;
}

.code-line {
  min-height: 1.2rem;
}

.cursor-blink {
  width: 2px;
  height: 1.2rem;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  cursor: pointer;
}

.scroll-text {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
}

.bounce-animation {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.magic-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  font-size: 1rem;
  opacity: 0.6;
  animation: particleFloat 8s ease-in-out infinite;
}

@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  25% {
    transform: translateY(-30px) rotate(90deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-60px) rotate(180deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    gap: 3rem;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .wave {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .wave {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .main-panda {
    font-size: 6rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .panda-scene {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .wave {
    font-size: 2rem;
  }
  
  .main-panda {
    font-size: 5rem;
  }
  
  .social-links {
    flex-direction: column;
    align-items: center;
  }
}

/* Global animations from global.css */
@keyframes pandaFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

@keyframes pandaWiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

/* Dark mode adjustments */
[data-theme="dark"] .hero-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

[data-theme="light"] .hero-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

/* Print styles */
@media print {
  .hero-section {
    page-break-inside: avoid;
  }
  
  .magic-particles,
  .floating-elements {
    display: none;
  }
}
</style>

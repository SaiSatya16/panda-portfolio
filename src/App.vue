<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <div 
            id="app" 
            class="app-container"
            :class="themeClass"
            :style="appStyles"
          >
            <PandaLoader />
            
            <!-- Navigation -->
            <nav class="navbar" :style="navbarStyles">
              <div class="nav-container">
                <div class="nav-brand" @click="rotatePandaEmoji" :style="brandStyles">
                  {{ currentEmoji }} Portfolio
                </div>
                
                <div class="nav-menu">
                  <a href="#about" class="nav-link" :style="linkStyles">About</a>
                  <a href="#experience" class="nav-link" :style="linkStyles">Experience</a>
                  <a href="#projects" class="nav-link" :style="linkStyles">Projects</a>
                  <a href="#skills" class="nav-link" :style="linkStyles">Skills</a>
                  <a href="#contact" class="nav-link" :style="linkStyles">Contact</a>
                  
                  <!-- <button 
                    @click="handleThemeToggle"
                    class="theme-toggle-btn"
                    :style="toggleButtonStyles"
                    :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
                  >
                    {{ isDark ? '🌙' : '☀️' }}
                    <span class="theme-text">{{ isDark ? 'Dark' : 'Light' }}</span>
                  </button> -->
                </div>
              </div>
            </nav>

            <!-- Floating Pandas -->
            <PandaFloating 
              v-for="(panda, index) in floatingPandas" 
              :key="index"
              :emoji="panda.emoji"
              :initial-x="panda.x"
              :initial-y="panda.y"
            />

            <!-- Main Content -->
            <main>
              <HeroSection />
              <AboutSection />
              <ExperienceSection />
              <ProjectsSection />
              <SkillsSection />
              <ContactSection />
            </main>

            <!-- Footer -->
            <footer class="footer" :style="footerStyles">
              <div class="footer-content">
                <p :style="{ color: pandaColors.textSecondary }">
                  &copy; 2025 {{ portfolioData.personal.name }}. Made with 🐼 and Vue.js
                </p>
              </div>
            </footer>
          </div>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  NConfigProvider, 
  NMessageProvider, 
  NDialogProvider, 
  NNotificationProvider,
  darkTheme 
} from 'naive-ui'
import { usePandaTheme } from './composables/usePandaTheme'
import { portfolioData } from './data/portfolio'

// Components
import PandaLoader from './components/PandaLoader.vue'
import PandaFloating from './components/PandaFloating.vue'
import HeroSection from './components/sections/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ExperienceSection from './components/sections/ExperienceSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import ContactSection from './components/sections/ContactSection.vue'

const { isDark, toggleDark, pandaColors, currentEmoji, rotatePandaEmoji, initTheme } = usePandaTheme()

const floatingPandas = ref([
  { emoji: '🐾', x: 100, y: 200 },
])

// Debug states
const showDebug = ref(true) // Set to false in production
const htmlTheme = ref('')

// Computed styles that react to theme changes
const themeClass = computed(() => isDark.value ? 'theme-dark' : 'theme-light')

const appStyles = computed(() => ({
  backgroundColor: pandaColors.value.background,
  color: pandaColors.value.text,
  minHeight: '100vh',
  transition: 'all 0.3s ease'
}))

const navbarStyles = computed(() => ({
  backgroundColor: pandaColors.value.surface,
  borderBottomColor: pandaColors.value.border
}))

const brandStyles = computed(() => ({
  color: pandaColors.value.text
}))

const linkStyles = computed(() => ({
  color: pandaColors.value.text
}))

const toggleButtonStyles = computed(() => ({
  backgroundColor: pandaColors.value.surface,
  borderColor: pandaColors.value.border,
  color: pandaColors.value.text
}))

const footerStyles = computed(() => ({
  backgroundColor: pandaColors.value.surface,
  borderTopColor: pandaColors.value.border
}))

const debugStyles = computed(() => ({
  backgroundColor: pandaColors.value.surface,
  borderColor: pandaColors.value.primary,
  color: pandaColors.value.text
}))

// Theme toggle handler with debugging
const handleThemeToggle = () => {
  console.log('=== THEME TOGGLE CLICKED ===')
  console.log('Before toggle - isDark:', isDark.value)
  console.log('Before toggle - colors:', pandaColors.value)
  
  toggleDark()
  
  console.log('After toggle - isDark:', isDark.value)
  console.log('After toggle - colors:', pandaColors.value)
  
  // Force update debug info
  updateDebugInfo()
  
  // Force re-render by updating a reactive property
  setTimeout(updateDebugInfo, 100)
}

const updateDebugInfo = () => {
  htmlTheme.value = document.documentElement.getAttribute('data-theme') || 'none'
}

onMounted(() => {
  console.log('App mounted - initializing theme')
  
  // Initialize theme
  initTheme()
  
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth'
  
  // Update debug info
  updateDebugInfo()
  
  console.log('Initial setup complete')
  console.log('Initial colors:', pandaColors.value)
})
</script>

<style scoped>
/* Use CSS classes for theme-specific styles */
.app-container {
  min-height: 100vh;
  transition: all 0.3s ease;
}

.theme-light {
  background-color: #ffffff;
  color: #1a1a1a;
}

.theme-dark {
  background-color: #0f172a;
  color: #f1f5f9;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border-bottom: 1px solid;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  opacity: 0.8;
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.theme-toggle-btn:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.theme-text {
  font-size: 0.8rem;
  font-weight: 500;
}

.debug-panel {
  position: fixed;
  top: 100px;
  right: 20px;
  border: 2px solid;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  z-index: 9999;
  max-width: 250px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.debug-panel h4 {
  margin: 0 0 0.5rem 0;
}

.debug-panel p {
  margin: 0.25rem 0;
  font-size: 0.8rem;
}

.debug-btn {
  margin: 0.25rem 0.25rem 0 0;
  padding: 0.25rem 0.5rem;
  background: currentColor;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.7rem;
}

.footer {
  padding: 2rem;
  text-align: center;
  border-top: 1px solid;
  transition: all 0.3s ease;
}

main {
  padding-top: 80px;
}

@media (max-width: 768px) {
  .nav-menu {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
  
  .theme-text {
    display: none;
  }
  
  .debug-panel {
    right: 10px;
    top: 80px;
    font-size: 0.8rem;
    max-width: 200px;
  }
}
</style>

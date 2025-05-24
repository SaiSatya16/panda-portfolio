<template>
  <section id="projects" class="projects-section" :style="{ backgroundColor: pandaColors.surface }">
    <div class="container">
      <h2 class="section-title">Featured Projects 🚀</h2>
      
      <div class="projects-filter">
        <n-button
          v-for="category in categories"
          :key="category"
          :type="selectedCategory === category ? 'primary' : 'default'"
          @click="filterProjects(category)"
          class="filter-btn"
        >
          {{ category }} {{ getCategoryEmoji(category) }}
        </n-button>
      </div>
      
      <div class="projects-grid">
        <div 
          v-for="(project, index) in filteredProjects" 
          :key="project.title"
          class="project-card"
          @mouseenter="startProjectAnimation(index)"
          @mouseleave="stopProjectAnimation(index)"
        >
          <div class="project-header">
            <div class="project-icon">{{ getProjectIcon(project.type) }}</div>
            <div 
              class="panda-coding"
              :class="{ 'coding-active': animatingProjects.includes(index) }"
            >
              🐼‍💻
            </div>
          </div>
          
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            
            <div class="tech-stack">
              <n-tag 
                v-for="tech in project.technologies.slice(0, 4)" 
                :key="tech"
                size="small"
                type="info"
                class="tech-badge"
              >
                {{ tech }}
              </n-tag>
              <span v-if="project.technologies.length > 4" class="more-tech">
                +{{ project.technologies.length - 4 }} more
              </span>
            </div>
            
            <div class="achievements">
              <div 
                v-for="achievement in project.achievements" 
                :key="achievement"
                class="achievement-item"
              >
                ✨ {{ achievement }}
              </div>
            </div>
            
            <div class="project-actions">
              <n-button 
                type="primary" 
                tag="a" 
                :href="project.github" 
                target="_blank"
                class="action-btn"
              >
                <template #icon>
                  <span>📱</span>
                </template>
                View Code
              </n-button>
              
              <n-button 
                v-if="project.demo"
                tag="a" 
                :href="project.demo" 
                target="_blank"
                class="action-btn"
              >
                <template #icon>
                  <span>🚀</span>
                </template>
                Live Demo
              </n-button>
            </div>
          </div>
          
          <div class="bamboo-decoration">🎋</div>
        </div>
      </div>
      
      <div class="floating-pandas">
        <div class="floating-panda" v-for="i in 3" :key="i">🐾</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NButton, NTag } from 'naive-ui'
import { usePandaTheme } from '../../composables/usePandaTheme'

const { pandaColors } = usePandaTheme()

const selectedCategory = ref('All')
const animatingProjects = ref([])

const projects = ref([
  {
    title: "CAMAFL - Carbon-Aware Federated Learning",
    description: "Energy-efficient federated learning framework with dynamic model allocation based on renewable energy availability.",
    technologies: ["Python", "PyTorch", "FlowerFL", "Machine Learning", "Federated Learning"],
    github: "https://github.com/msck72/CAMA",
    achievements: ["15% energy reduction", "3.8% accuracy improvement", "Published in IEEE"],
    type: "research"
  },
  {
    title: "Liquid Democracy E-Voting System",
    description: "Blockchain-based secure voting platform with delegation features and cryptographic security.",
    technologies: ["Python", "Flask", "Vue.js", "Solidity", "Ethereum", "AES-GCM"],
    github: "https://github.com/SaiSatya16/Liquid-Democracy-Secure-I-Voting-through-Blockchain-Technology",
    achievements: ["100% transparency", "Advanced cryptography", "Smart contracts"],
    type: "blockchain"
  },
  {
    title: "Dynamic Authentication System",
    description: "Multi-factor authentication platform with Okta integration and enterprise security.",
    technologies: ["Flask", "Vue.js", "Okta APIs", "OIDC", "MFA", "JWT"],
    github: "https://github.com/SaiSatya16/Dynamic-Authentication-System-with-Multi-Factor-Security-using-Okta",
    achievements: ["Enterprise-grade security", "Multiple MFA providers", "TOTP integration"],
    type: "security"
  },
  {
    title: "Grocery Store Full-Stack Application",
    description: "Comprehensive e-commerce platform with role-based authentication and inventory management.",
    technologies: ["Flask", "Vue.js", "SQLite", "Redis", "Celery", "AWS"],
    github: "https://github.com/SaiSatya16/Grocery-Store-V2",
    achievements: ["Multi-user platform", "Real-time inventory", "Cloud deployment"],
    type: "web"
  },
  {
    title: "Synthetic Data Generation using CTGAN",
    description: "Privacy-preserving synthetic data generation system for financial and HR datasets.",
    technologies: ["Python", "Flask", "CTGAN", "SDV", "Pandas", "Machine Learning"],
    github: "https://github.com/SaiSatya16/Synthetic-Data-Generation-using-CTGAN",
    achievements: ["10,000+ records generated", "Industry compliance", "Privacy-preserving"],
    type: "ai"
  },
  {
    title: "Daily Expenses Sharing Application",
    description: "Full-stack expense management platform with advanced splitting algorithms and analytics.",
    technologies: ["Flask", "Vue.js", "MongoDB Atlas", "AWS", "Chart.js", "JWT"],
    github: "https://github.com/SaiSatya16/Daily-Expenses-Sharing-Application-Flask",
    achievements: ["AWS deployment", "Real-time analytics", "CI/CD pipeline"],
    type: "web"
  }
])

const categories = ref(['All', 'Research', 'Blockchain', 'Web', 'AI/ML', 'Security'])

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return projects.value
  const categoryMap = {
    'Research': 'research',
    'Blockchain': 'blockchain', 
    'Web': 'web',
    'AI/ML': 'ai',
    'Security': 'security'
  }
  return projects.value.filter(p => p.type === categoryMap[selectedCategory.value])
})

const filterProjects = (category) => {
  selectedCategory.value = category
}

const getCategoryEmoji = (category) => {
  const emojis = {
    'All': '🐼',
    'Research': '🔬',
    'Blockchain': '⛓️',
    'Web': '🌐',
    'AI/ML': '🤖',
    'Security': '🔒'
  }
  return emojis[category] || '🐼'
}

const getProjectIcon = (type) => {
  const icons = {
    'research': '🔬',
    'blockchain': '⛓️',
    'web': '🌐',
    'ai': '🤖',
    'security': '🔒'
  }
  return icons[type] || '💻'
}

const startProjectAnimation = (index) => {
  if (!animatingProjects.value.includes(index)) {
    animatingProjects.value.push(index)
  }
}

const stopProjectAnimation = (index) => {
  animatingProjects.value = animatingProjects.value.filter(i => i !== index)
}
</script>

<style scoped>
.projects-section {
  padding: 6rem 2rem;
  min-height: 100vh;
  position: relative;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, var(--panda-blue), var(--panda-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.projects-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  transition: all 0.3s ease;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background: var(--panda-background);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  border-color: var(--panda-green);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.project-icon {
  font-size: 2.5rem;
  animation: pandaBounce 3s ease-in-out infinite;
}

.panda-coding {
  font-size: 2rem;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.panda-coding.coding-active {
  opacity: 1;
  animation: pandaWiggle 1s ease-in-out;
}

.project-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--panda-primary);
  margin-bottom: 1rem;
}

.project-description {
  color: var(--panda-gray);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-badge {
  transition: transform 0.2s ease;
}

.tech-badge:hover {
  transform: scale(1.05);
}

.more-tech {
  font-size: 0.8rem;
  color: var(--panda-gray);
  background: var(--panda-surface);
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
}

.achievements {
  margin-bottom: 2rem;
}

.achievement-item {
  font-size: 0.9rem;
  color: var(--panda-green);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.project-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  flex: 1;
  transition: all 0.3s ease;
}

.bamboo-decoration {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  opacity: 0.2;
  animation: pandaFloat 4s ease-in-out infinite;
}

.floating-pandas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-panda {
  position: absolute;
  font-size: 2rem;
  animation: pandaFloat 6s ease-in-out infinite;
  opacity: 0.1;
}

.floating-panda:nth-child(1) {
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.floating-panda:nth-child(2) {
  top: 50%;
  right: 10%;
  animation-delay: 2s;
}

.floating-panda:nth-child(3) {
  bottom: 20%;
  left: 10%;
  animation-delay: 4s;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-card {
    margin: 1rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .projects-filter {
    gap: 0.5rem;
  }
  
  .project-actions {
    flex-direction: column;
  }
}
</style>

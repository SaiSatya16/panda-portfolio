<template>
  <section id="skills" class="skills-section" :style="{ backgroundColor: pandaColors.background }">
    <div class="container">
      <h2 class="section-title">Technical Skills 🛠️</h2>
      
      <div class="skills-container">
        <div 
          v-for="(skillGroup, category) in skills" 
          :key="category"
          class="skill-category"
          @mouseenter="activateCategory(category)"
          @mouseleave="deactivateCategory(category)"
        >
          <div class="category-header">
            <h3 class="category-title">
              {{ getCategoryIcon(category) }} {{ category }}
            </h3>
            <div 
              class="panda-skill"
              :class="{ 'skill-active': activeCategories.includes(category) }"
            >
              🐼
            </div>
          </div>
          
          <div class="skills-grid">
            <div 
              v-for="(skill, index) in skillGroup" 
              :key="skill"
              class="skill-item"
              :style="{ animationDelay: `${index * 0.1}s` }"
              @click="celebrateSkill(skill)"
            >
              <div class="skill-content">
                <span class="skill-icon">{{ getSkillIcon(skill) }}</span>
                <span class="skill-name">{{ skill }}</span>
                <div class="skill-level">
                  <div 
                    class="level-bar" 
                    :style="{ width: `${getSkillLevel(skill)}%` }"
                  ></div>
                </div>
              </div>
              
              <div class="skill-particles" v-if="celebratingSkills.includes(skill)">
                <span v-for="i in 5" :key="i" class="particle">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="skills-summary">
        <div class="summary-card">
          <h3>Skills Overview 📊</h3>
          <div class="summary-stats">
            <div class="stat">
              <span class="stat-number">{{ totalSkills }}</span>
              <span class="stat-label">Total Skills</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ Object.keys(skills).length }}</span>
              <span class="stat-label">Categories</span>
            </div>
            <div class="stat">
              <span class="stat-number">5+</span>
              <span class="stat-label">Years Coding Experience</span>
            </div>
          </div>
          
          <div class="panda-celebration">
            <div class="main-panda">🐼‍💻</div>
            <div class="celebration-text">Always learning like a hungry panda! 🎋</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePandaTheme } from '../../composables/usePandaTheme'

const { pandaColors } = usePandaTheme()

const activeCategories = ref([])
const celebratingSkills = ref([])

const skills = ref({
  "Programming Languages": ["Python", "Java", "JavaScript", "Go", "TypeScript"],
  "Frontend": ["Vue.js", "React", "Angular", "HTML/CSS", "Bootstrap", "Ant Design", "Naive UI"],
  "Backend": ["Django", "Flask", "Spring Boot", "Node.js", "REST APIs"],
  "Databases": ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite", "Supabase"],
  "Cloud & DevOps": ["AWS", "GCP", "Docker", "CI/CD", "Git", "Kubernetes"],
  "AI/ML": ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "NumPy", "CTGAN"],
  "Security": ["Auth0", "Okta", "OIDC", "JWT", "OAuth", "Cryptography"],
  "Tools": ["Postman", "Docker", "Git", "Linux", "VS Code", "IntelliJ"]
})

const totalSkills = computed(() => {
  return Object.values(skills.value).reduce((total, skillGroup) => total + skillGroup.length, 0)
})

const getCategoryIcon = (category) => {
  const icons = {
    "Programming Languages": "💻",
    "Frontend": "🎨",
    "Backend": "⚙️",
    "Databases": "🗄️",
    "Cloud & DevOps": "☁️",
    "AI/ML": "🤖",
    "Security": "🔒",
    "Tools": "🛠️"
  }
  return icons[category] || "📚"
}

const getSkillIcon = (skill) => {
  const skillIcons = {
    "Python": "🐍", "Java": "☕", "JavaScript": "🟨", "Vue.js": "💚",
    "React": "⚛️", "Angular": "🔴", "Django": "🎸", "Flask": "🌶️",
    "AWS": "🟠", "Docker": "🐳", "Git": "🌿", "PostgreSQL": "🐘",
    "MongoDB": "🍃", "Redis": "🔴", "PyTorch": "🔥", "Auth0": "🔐"
  }
  return skillIcons[skill] || "🔧"
}

const getSkillLevel = (skill) => {
  // Simulate skill levels (in real app, this would come from data)
  const levels = {
    "Python": 95, "JavaScript": 90, "Vue.js": 92, "Django": 88,
    "Flask": 85, "AWS": 80, "React": 75, "Docker": 70
  }
  return levels[skill] || Math.floor(Math.random() * 30) + 70
}

const activateCategory = (category) => {
  if (!activeCategories.value.includes(category)) {
    activeCategories.value.push(category)
  }
}

const deactivateCategory = (category) => {
  activeCategories.value = activeCategories.value.filter(c => c !== category)
}

const celebrateSkill = (skill) => {
  if (!celebratingSkills.value.includes(skill)) {
    celebratingSkills.value.push(skill)
    setTimeout(() => {
      celebratingSkills.value = celebratingSkills.value.filter(s => s !== skill)
    }, 2000)
  }
}
</script>

<style scoped>
.skills-section {
  padding: 6rem 2rem;
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, var(--panda-yellow), var(--panda-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.skill-category {
  background: var(--panda-surface);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.skill-category:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.category-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--panda-primary);
}

.panda-skill {
  font-size: 1.5rem;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.panda-skill.skill-active {
  opacity: 1;
  animation: pandaBounce 1s ease-in-out;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.skill-item {
  background: var(--panda-background);
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.5s ease-out both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skill-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.skill-content {
  position: relative;
  z-index: 2;
}

.skill-icon {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--panda-text);
  display: block;
  margin-bottom: 0.5rem;
}

.skill-level {
  height: 4px;
  background: var(--panda-light-gray);
  border-radius: 2px;
  overflow: hidden;
}

.level-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--panda-green), var(--panda-blue));
  border-radius: 2px;
  transition: width 1s ease-out;
}

.skill-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  font-size: 0.8rem;
  animation: particleFloat 2s ease-out forwards;
}

@keyframes particleFloat {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px) scale(0.5);
  }
}

.particle:nth-child(1) { left: 10%; animation-delay: 0s; }
.particle:nth-child(2) { left: 30%; animation-delay: 0.2s; }
.particle:nth-child(3) { left: 50%; animation-delay: 0.4s; }
.particle:nth-child(4) { left: 70%; animation-delay: 0.6s; }
.particle:nth-child(5) { left: 90%; animation-delay: 0.8s; }

.skills-summary {
  margin-top: 4rem;
}

.summary-card {
  background: linear-gradient(135deg, var(--panda-green), var(--panda-blue));
  border-radius: 1.5rem;
  padding: 3rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.summary-card h3 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.summary-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

.panda-celebration {
  margin-top: 2rem;
}

.main-panda {
  font-size: 3rem;
  animation: pandaBounce 2s ease-in-out infinite;
  margin-bottom: 1rem;
}

.celebration-text {
  font-size: 1.1rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .skills-container {
    grid-template-columns: 1fr;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .summary-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>

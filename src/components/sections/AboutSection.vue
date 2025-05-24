<template>
  <section id="about" class="about-section" :style="{ backgroundColor: pandaColors.surface }">
    <div class="container">
      <h2 class="section-title">About Me 🐼</h2>
      <div class="about-content">
        <div class="about-text">
          <div class="text-content">
            <h3>Like a Panda, I Balance Work and Play!</h3>
            <p>
              I'm a passionate Software Engineer who approaches coding like a panda approaches bamboo - 
              methodically, efficiently, and with great enthusiasm! With expertise spanning full-stack 
              development, AI/ML, and blockchain technologies, I build solutions that are both robust and elegant.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
              projects, or sharing knowledge with the developer community. I believe in the power of 
              clean code, user-centered design, and continuous learning.
            </p>
            
            <div class="stats-grid">
              <div class="stat-item" v-for="stat in stats" :key="stat.label">
                <div class="stat-number">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="about-visual">
          <div class="panda-workspace">
            <div class="desk">
              <div class="laptop">💻</div>
              <div class="coffee">☕</div>
              <div class="plant">🎋</div>
            </div>
            <div class="coding-panda">
              <div class="panda-dev">🐼‍💻</div>
              <div class="thought-bubble">
                <span v-for="(tech, index) in techStack" :key="index" class="tech-item">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { usePandaTheme } from '../../composables/usePandaTheme'

const { pandaColors } = usePandaTheme()

const stats = ref([
  { value: '1+', label: 'Years Work Experience' },
  { value: '20+', label: 'Projects Built' },
  { value: '5+', label: 'Technologies' },
  { value: '1', label: 'Published Paper' }
])

const techStack = ref(['⚛️', '🟢', '🐍', '☁️', '🔒', '🤖'])
</script>

<style scoped>
.about-section {
  padding: 6rem 2rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.section-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, var(--panda-green), var(--panda-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.text-content h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--panda-primary);
}

.text-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: var(--panda-gray);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: var(--panda-background);
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--panda-green);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: var(--panda-gray);
}

.panda-workspace {
  position: relative;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.desk {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  font-size: 3rem;
}

.laptop, .coffee, .plant {
  animation: pandaFloat 3s ease-in-out infinite;
}

.coffee { animation-delay: 1s; }
.plant { animation-delay: 2s; }

.coding-panda {
  position: relative;
  text-align: center;
}

.panda-dev {
  font-size: 5rem;
  animation: pandaBounce 2s ease-in-out infinite;
}

.thought-bubble {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 0.5rem;
}

.thought-bubble::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;
}

.tech-item {
  font-size: 1.5rem;
  animation: pandaFloat 2s ease-in-out infinite;
}

.tech-item:nth-child(even) {
  animation-delay: 0.5s;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>

<template>
  <section id="experience" class="experience-section" :style="{ backgroundColor: pandaColors.background }">
    <div class="container">
      <h2 class="section-title">Work Experience 💼</h2>
      <div class="experience-timeline">
        <div 
          v-for="(exp, index) in experiences" 
          :key="index"
          class="experience-item"
          :class="{ 'reverse': index % 2 === 1 }"
        >
          <div class="timeline-dot">
            <div class="dot-inner">🐼</div>
          </div>
          
          <div class="experience-card" @mouseenter="wigglePanda(index)" @mouseleave="stopWiggle(index)">
            <div class="card-header">
              <h3 class="job-title">{{ exp.title }}</h3>
              <div class="company-duration">
                <span class="company">{{ exp.company }}</span>
                <span class="duration">{{ exp.duration }}</span>
              </div>
              <div class="location">📍 {{ exp.location }}</div>
            </div>
            
            <div class="technologies">
              <n-tag 
                v-for="tech in exp.technologies" 
                :key="tech"
                type="success"
                size="small"
                class="tech-tag"
              >
                {{ tech }}
              </n-tag>
            </div>
            
            <ul class="highlights">
              <li v-for="highlight in exp.highlights" :key="highlight">
                {{ highlight }}
              </li>
            </ul>
            
            <div 
              class="panda-mascot"
              :class="{ 'wiggling': wigglingCards.includes(index) }"
            >
              🐼‍💻
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { NTag } from 'naive-ui'
import { usePandaTheme } from '../../composables/usePandaTheme'

const { pandaColors } = usePandaTheme()

const wigglingCards = ref([])

const experiences = ref([
  {
    title: "Associate Software Intern (Cyber Risk and Regulatory)",
    company: "PwC AC",
    duration: "Feb 2025 - Present",
    location: "Bangalore, India",
    technologies: ["Spring Boot", "Angular", "Auth0", "AWS", "Okta", "IAM"],
    highlights: [
      "Built full-stack testing tools automating API authentication workflows",
      "Implemented sophisticated token caching with scope-to-audience mapping",
      "Managed Auth0 tenant infrastructure and AWS serverless deployments"
    ]
  },
  {
    title: "Software Development Engineer Intern",
    company: "AskMeIdentity",
    duration: "Sep 2024 - Feb 2025",
    location: "Hyderabad, India",
    technologies: ["Django", "PostgreSQL", "VueJS", "Angular", "AWS", "GCP"],
    highlights: [
      "Developed comprehensive Sales Interaction tracker system",
      "Redesigned company website with enhanced user experience",
      "Architected scalable cloud infrastructure solutions"
    ]
  },
  {
    title: "Mitacs Globalink Research Intern",
    company: "University of Calgary",
    duration: "Jun 2024 - Aug 2024",
    location: "Calgary, Canada",
    technologies: ["Python", "PyTorch", "FlowerFL", "Federated Learning"],
    highlights: [
      "Developed CAMAFL framework with 15% energy reduction",
      "Achieved 3.8% accuracy improvement and 20% faster convergence",
      "Published research in IEEE BigData Conference"
    ]
  },
  {
    title: "Samsung PRISM Virtual Intern",
    company: "Samsung R&D Institute India",
    duration: "Aug 2023 - Feb 2024",
    location: "Chennai, India",
    technologies: ["Android Development", "Flask", "DeepLabV3"],
    highlights: [
      "Built Android app with AI-powered human segmentation",
      "Engineered end-to-end image processing pipeline",
      "Integrated computer vision with mobile development"
    ]
  }
])

const wigglePanda = (index) => {
  if (!wigglingCards.value.includes(index)) {
    wigglingCards.value.push(index)
  }
}

const stopWiggle = (index) => {
  wigglingCards.value = wigglingCards.value.filter(i => i !== index)
}
</script>

<style scoped>
.experience-section {
  padding: 6rem 2rem;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, var(--panda-purple), var(--panda-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.experience-timeline {
  position: relative;
  padding: 2rem 0;
}

.experience-timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, var(--panda-green), var(--panda-blue));
  border-radius: 2px;
}

.experience-item {
  position: relative;
  margin: 3rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.experience-item.reverse {
  justify-content: flex-end;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background: var(--panda-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
}

.dot-inner {
  font-size: 1.5rem;
  animation: pandaBounce 2s ease-in-out infinite;
}

.experience-card {
  width: 45%;
  background: var(--panda-surface);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.experience-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.experience-item.reverse .experience-card {
  margin-right: 0;
  margin-left: auto;
}

.card-header {
  margin-bottom: 1.5rem;
}

.job-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--panda-primary);
  margin-bottom: 0.5rem;
}

.company-duration {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.company {
  font-weight: 600;
  color: var(--panda-green);
  font-size: 1.1rem;
}

.duration {
  font-size: 0.9rem;
  color: var(--panda-gray);
  background: var(--panda-background);
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
}

.location {
  font-size: 0.9rem;
  color: var(--panda-gray);
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  transition: transform 0.2s ease;
}

.tech-tag:hover {
  transform: scale(1.05);
}

.highlights {
  list-style: none;
  padding: 0;
  margin: 0;
}

.highlights li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--panda-text);
  line-height: 1.6;
}

.highlights li::before {
  content: '🐾';
  position: absolute;
  left: 0;
  top: 0;
}

.panda-mascot {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 2rem;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.panda-mascot.wiggling {
  animation: pandaWiggle 1s ease-in-out;
  opacity: 1;
}

@media (max-width: 768px) {
  .experience-timeline::before {
    left: 30px;
  }
  
  .timeline-dot {
    left: 30px;
    width: 40px;
    height: 40px;
  }
  
  .experience-item,
  .experience-item.reverse {
    justify-content: flex-end;
  }
  
  .experience-card {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>

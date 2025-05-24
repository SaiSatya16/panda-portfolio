<template>
  <section id="contact" class="contact-section" :style="{ backgroundColor: pandaColors.surface }">
    <div class="container">
      <h2 class="section-title">Let's Connect! 🐼</h2>
      
      <div class="contact-content">
        <div class="contact-info">
          <div class="info-header">
            <h3>Get In Touch</h3>
            <p>Feel free to reach out for collaborations, opportunities, or just a friendly chat about tech!</p>
          </div>
          
          <div class="contact-methods">
            <a 
              v-for="method in contactMethods" 
              :key="method.type"
              :href="method.link" 
              :target="method.external ? '_blank' : '_self'"
              class="contact-method"
              @mouseenter="wiggleMethod(method.type)"
            >
              <div class="method-icon">{{ method.icon }}</div>
              <div class="method-details">
                <div class="method-label">{{ method.label }}</div>
                <div class="method-value">{{ method.value }}</div>
              </div>
              <div 
                class="panda-wave"
                :class="{ 'waving': wigglingMethods.includes(method.type) }"
              >
                👋
              </div>
            </a>
          </div>
          
          <div class="social-links">
            <h4>Find me online</h4>
            <div class="social-grid">
              <a 
                v-for="social in socialLinks" 
                :key="social.platform"
                :href="social.url" 
                target="_blank"
                class="social-link"
                @click="celebrateSocial(social.platform)"
              >
                <span class="social-icon">{{ social.icon }}</span>
                <span class="social-name">{{ social.platform }}</span>
                <div class="celebration-effect" v-if="celebratingSocials.includes(social.platform)">
                  <span v-for="i in 6" :key="i" class="celebration-particle">🎉</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div class="contact-form-section">
          <div class="form-container">
            <h3>Send me a message 📨</h3>
            <n-form ref="formRef" :model="formData" :rules="formRules">
              <n-form-item path="name" label="Name">
                <n-input 
                  v-model:value="formData.name" 
                  placeholder="Your awesome name"
                  class="form-input"
                />
              </n-form-item>
              
              <n-form-item path="email" label="Email">
                <n-input 
                  v-model:value="formData.email" 
                  placeholder="your.email@example.com"
                  class="form-input"
                />
              </n-form-item>
              
              <n-form-item path="subject" label="Subject">
                <n-input 
                  v-model:value="formData.subject" 
                  placeholder="What's this about?"
                  class="form-input"
                />
              </n-form-item>
              
              <n-form-item path="message" label="Message">
                <n-input 
                  v-model:value="formData.message" 
                  type="textarea" 
                  placeholder="Tell me your thoughts..."
                  :rows="5"
                  class="form-input"
                />
              </n-form-item>
              
              <n-form-item>
                <n-button 
                  type="primary" 
                  size="large" 
                  @click="sendMessage"
                  :loading="sending"
                  class="send-button"
                >
                  <template #icon>
                    <span>🚀</span>
                  </template>
                  Send Message
                </n-button>
              </n-form-item>
            </n-form>
            
            <div class="form-panda">
              <div 
                class="typing-panda"
                :class="{ 'typing': formData.message.length > 0 }"
              >
                🐼‍💻
              </div>
              <div class="panda-thought" v-if="formData.message.length > 10">
                "This looks interesting!" 💭
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="floating-elements">
        <div class="floating-bamboo">🎋</div>
        <div class="floating-heart">💚</div>
        <div class="floating-star">⭐</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import { usePandaTheme } from '../../composables/usePandaTheme'

const { pandaColors } = usePandaTheme()
const message = useMessage()

const formRef = ref(null)
const sending = ref(false)
const wigglingMethods = ref([])
const celebratingSocials = ref([])

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const formRules = {
  name: {
    required: true,
    message: 'Please input your name',
    trigger: 'blur'
  },
  email: {
    required: true,
    message: 'Please input your email',
    trigger: 'blur'
  },
  message: {
    required: true,
    message: 'Please input your message',
    trigger: 'blur'
  }
}

const contactMethods = ref([
  {
    type: 'email',
    icon: '📧',
    label: 'Email',
    value: 'sai.satyanarayana@askmeidentity.com',
    link: 'mailto:sai.satyanarayana@askmeidentity.com',
    external: false
  },
  {
    type: 'phone',
    icon: '📱',
    label: 'Phone',
    value: '+91 8008757469',
    link: 'tel:+918008757469',
    external: false
  },
  {
    type: 'location',
    icon: '📍',
    label: 'Location',
    value: 'Bangalore, India',
    link: '#',
    external: false
  }
])

const socialLinks = ref([
  {
    platform: 'LinkedIn',
    icon: '💼',
    url: 'https://www.linkedin.com/in/sai-satya-jonnalagadda-157900225/'
  },
  {
    platform: 'GitHub',
    icon: '🐱',
    url: 'https://github.com/SaiSatya16'
  },
  {
    platform: 'Portfolio',
    icon: '🌐',
    url: '#'
  }
])

const wiggleMethod = (type) => {
  if (!wigglingMethods.value.includes(type)) {
    wigglingMethods.value.push(type)
    setTimeout(() => {
      wigglingMethods.value = wigglingMethods.value.filter(m => m !== type)
    }, 1000)
  }
}

const celebrateSocial = (platform) => {
  if (!celebratingSocials.value.includes(platform)) {
    celebratingSocials.value.push(platform)
    setTimeout(() => {
      celebratingSocials.value = celebratingSocials.value.filter(s => s !== platform)
    }, 2000)
  }
}

const sendMessage = async () => {
  try {
    await formRef.value?.validate()
    sending.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    message.success('Message sent successfully! 🐼 I\'ll get back to you soon!')
    
    // Reset form
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    message.error('Please fill in all required fields')
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.contact-section {
  padding: 6rem 2rem;
  min-height: 100vh;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, var(--panda-pink), var(--panda-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.info-header {
  margin-bottom: 3rem;
}

.info-header h3 {
  font-size: 2rem;
  color: var(--panda-primary);
  margin-bottom: 1rem;
}

.info-header p {
  font-size: 1.1rem;
  color: var(--panda-gray);
  line-height: 1.6;
}

.contact-methods {
  margin-bottom: 3rem;
}

.contact-method {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: var(--panda-background);
  border-radius: 1rem;
  margin-bottom: 1rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.contact-method:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.method-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  width: 40px;
  text-align: center;
}

.method-details {
  flex: 1;
}

.method-label {
  font-size: 0.9rem;
  color: var(--panda-gray);
  margin-bottom: 0.25rem;
}

.method-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--panda-primary);
}

.panda-wave {
  font-size: 1.2rem;
  opacity: 0;
  transition: all 0.3s ease;
}

.panda-wave.waving {
  opacity: 1;
  animation: wave 1s ease-in-out;
}

.social-links {
  margin-top: 2rem;
}

.social-links h4 {
  font-size: 1.2rem;
  color: var(--panda-primary);
  margin-bottom: 1rem;
}

.social-grid {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: var(--panda-background);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 80px;
}

.social-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.social-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.social-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--panda-gray);
}

.celebration-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.celebration-particle {
  position: absolute;
  font-size: 0.8rem;
  animation: celebrationFloat 2s ease-out forwards;
}

@keyframes celebrationFloat {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-40px) scale(0.5);
  }
}

.celebration-particle:nth-child(1) { left: 10%; animation-delay: 0s; }
.celebration-particle:nth-child(2) { left: 30%; animation-delay: 0.1s; }
.celebration-particle:nth-child(3) { left: 50%; animation-delay: 0.2s; }
.celebration-particle:nth-child(4) { left: 70%; animation-delay: 0.3s; }
.celebration-particle:nth-child(5) { left: 90%; animation-delay: 0.4s; }
.celebration-particle:nth-child(6) { left: 50%; animation-delay: 0.5s; }

.form-container {
  background: var(--panda-background);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  position: relative;
}

.form-container h3 {
  font-size: 1.5rem;
  color: var(--panda-primary);
  margin-bottom: 2rem;
  text-align: center;
}

.form-input {
  margin-bottom: 1rem;
}

.send-button {
  width: 100%;
  height: 50px;
  font-size: 1.1rem;
}

.form-panda {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  text-align: center;
}

.typing-panda {
  font-size: 1.5rem;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.typing-panda.typing {
  opacity: 1;
  animation: pandaBounce 1s ease-in-out infinite;
}

.panda-thought {
  position: absolute;
  bottom: 100%;
  right: 0;
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 0.8rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  margin-bottom: 0.5rem;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.floating-bamboo,
.floating-heart,
.floating-star {
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: pandaFloat 8s ease-in-out infinite;
}

.floating-bamboo {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.floating-heart {
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.floating-star {
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .social-grid {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .contact-method {
    padding: 1rem;
  }
}
</style>

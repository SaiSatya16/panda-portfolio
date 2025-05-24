// import './assets/main.css'

// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')

import { createApp } from 'vue'
import { create } from 'naive-ui'
import App from './App.vue'
import './assets/styles/global.css'

// Create naive UI instance
const naive = create({
  components: [], // You can specify which components to register globally
})

const app = createApp(App)
app.use(naive)
app.mount('#app')

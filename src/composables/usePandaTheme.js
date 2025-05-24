import { ref, computed, watch } from 'vue'

export function usePandaTheme() {
  // Get initial theme from localStorage or default to light
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('panda-theme')
      if (saved) return saved === 'dark'
      
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  }
  
  const isDark = ref(getInitialTheme())
  
  const pandaEmojis = ['🐼']
  const currentEmoji = ref(pandaEmojis[0])
  
  const pandaColors = computed(() => ({
    primary: isDark.value ? '#10b981' : '#1a1a1a',
    secondary: isDark.value ? '#ec4899' : '#6b7280',
    background: isDark.value ? '#0f172a' : '#ffffff',
    surface: isDark.value ? '#1e293b' : '#f8fafc',
    text: isDark.value ? '#f1f5f9' : '#1a1a1a',
    textSecondary: isDark.value ? '#94a3b8' : '#6b7280',
    border: isDark.value ? '#334155' : '#e2e8f0'
  }))
  
  // Apply theme to document
  // In usePandaTheme.js, update the applyTheme function
const applyTheme = (dark) => {
  if (typeof document !== 'undefined') {
    const theme = dark ? 'dark' : 'light'
    const root = document.documentElement
    
    // Set data attribute
    root.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
    
    // Force CSS variable updates
    const colors = {
      'panda-primary': dark ? '#10b981' : '#1a1a1a',
      'panda-background': dark ? '#0f172a' : '#ffffff',
      'panda-surface': dark ? '#1e293b' : '#f8fafc',
      'panda-text': dark ? '#f1f5f9' : '#1a1a1a',
      'panda-text-secondary': dark ? '#94a3b8' : '#6b7280',
      'panda-border': dark ? '#334155' : '#e2e8f0'
    }
    
    // Apply CSS variables directly
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
    
    console.log('Theme applied:', theme, 'Colors:', colors)
  }
}

  
  // Toggle theme function
  const toggleDark = () => {
    console.log('Toggle clicked - Current theme:', isDark.value ? 'dark' : 'light')
    isDark.value = !isDark.value
    console.log('New theme:', isDark.value ? 'dark' : 'light')
  }
  
  // Watch for theme changes
  watch(isDark, (newValue) => {
    console.log('Theme watch triggered:', newValue ? 'dark' : 'light')
    applyTheme(newValue)
    
    // Save to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('panda-theme', newValue ? 'dark' : 'light')
    }
  }, { immediate: true })
  
  const rotatePandaEmoji = () => {
    const currentIndex = pandaEmojis.indexOf(currentEmoji.value)
    currentEmoji.value = pandaEmojis[(currentIndex + 1) % pandaEmojis.length]
  }
  
  // Initialize theme on first load
  const initTheme = () => {
    applyTheme(isDark.value)
  }
  
  return {
    isDark,
    toggleDark,
    pandaColors,
    currentEmoji,
    rotatePandaEmoji,
    initTheme
  }
}

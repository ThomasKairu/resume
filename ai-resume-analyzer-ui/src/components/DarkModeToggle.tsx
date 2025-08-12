import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function DarkModeToggle() {
  const [dark, setDark] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  // Initialize dark mode on mount
  useEffect(() => {
    setMounted(true)
    
    // Check localStorage first, then system preference
    const stored = localStorage.getItem('darkMode')
    let isDark = false
    
    if (stored !== null) {
      isDark = stored === 'true'
    } else {
      // Check system preference
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    setDark(isDark)
    
    // Apply immediately
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [dark, mounted])

  const toggleDark = () => {
    setDark(prev => !prev)
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed right-4 top-4 z-50 h-10 w-20 rounded-lg bg-slate-200 animate-pulse" />
    )
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Toggle dark mode"
      onClick={toggleDark}
      className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-slate-950 border border-slate-300 bg-white/90 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/90 dark:hover:bg-slate-800 fixed right-4 top-4 z-50 backdrop-blur shadow-sm"
    >
      {dark ? (
        <span className="inline-flex items-center gap-2"><MoonIcon /> <span className="hidden sm:inline">Dark</span></span>
      ) : (
        <span className="inline-flex items-center gap-2"><SunIcon /> <span className="hidden sm:inline">Light</span></span>
      )}
    </motion.button>
  )
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
      <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3A.75.75 0 0112 2.25zm0 15a.75.75 0 01.75.75v1.5a.75.75 0 11-1.5 0V18a.75.75 0 01.75-.75zM4.72 4.72a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.72 5.78a.75.75 0 010-1.06zm12.44 12.44a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H3A.75.75 0 012.25 12zm15 0a.75.75 0 01.75-.75h1.5a.75.75 0 110 1.5H18a.75.75 0 01-.75-.75zM4.72 19.28a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06L5.78 19.28a.75.75 0 01-1.06 0zm12.44-12.44a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0z" clipRule="evenodd" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
    </svg>
  )
}
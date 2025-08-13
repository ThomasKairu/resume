import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-16 max-w-6xl px-6 pb-12 pt-8 text-sm text-text/80 dark:text-slate-400"
    >
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <nav className="flex gap-6">
          <a className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors" href="#about">About</a>
          <a className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors" href="#privacy">Privacy</a>
          <a className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors" href="#contact">Contact</a>
        </nav>
        <div className="flex flex-col items-center gap-1 text-center">
          <p>© {new Date().getFullYear()} AI Resume Analyzer</p>
          <p className="text-xs">Advanced AI Technology • Privacy-First Design</p>
        </div>
      </div>
    </motion.footer>
  )
}
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-accent to-fuchsia-600">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent_50%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl px-6 py-20 text-center text-white"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          AI Resume Analyzer
        </h1>
        <p className="mt-4 text-lg leading-7 md:text-xl md:leading-8 text-indigo-100">
          Optimize your resume against any job description. Get instant feedback, keyword match scores, and actionable suggestions.
        </p>
      </motion.div>
    </section>
  )
}

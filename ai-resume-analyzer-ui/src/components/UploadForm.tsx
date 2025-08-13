import { useState } from 'react'
import { motion } from 'framer-motion'

type AnalyzePayload = {
  resumeText: string
  jobDescription: string
}

export default function UploadForm({ onAnalyze, loading }: { onAnalyze: (payload: AnalyzePayload) => void; loading?: boolean }) {
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnalyze({ resumeText, jobDescription })
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mx-auto -mt-16 max-w-5xl px-6"
    >
      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 p-6 sm:p-8 shadow-[0_0_20px_rgba(99,102,241,0.35)]">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Resume Text</label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              className="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500"
              rows={10}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500"
              rows={10}
              required
            />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            🔒 <strong>Privacy-first:</strong> Your resume and job description are processed securely and never stored. Analysis happens in real-time with no data retention.
          </p>
          <button 
            type="submit" 
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-slate-950 bg-primary text-white hover:bg-primary/90 focus:ring-primary"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              'Analyze'
            )}
          </button>
        </div>
      </form>
    </motion.section>
  )
}

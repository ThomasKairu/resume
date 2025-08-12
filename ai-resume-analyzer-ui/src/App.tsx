import { useState } from 'react'
import Hero from './components/Hero'
import UploadForm from './components/UploadForm'
import Results from './components/Results'
import AboutSection from './components/AboutSection'
import PrivacySection from './components/PrivacySection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

type AnalyzePayload = {
  resumeText: string
  jobDescription: string
}

type ResultData = {
  matchScore: number // 0-100
  missingKeywords: string[]
  matchedKeywords: string[]
  suggestedAdditions: string
  analysisMethod?: string
}

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003'

export default function App() {
  const [results, setResults] = useState<ResultData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (payload: AnalyzePayload) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Analysis failed')
      }

      const data = await response.json()
      
      if (data.success) {
        setResults(data.data)
      } else {
        throw new Error(data.error || 'Analysis failed')
      }
    } catch (err) {
      console.error('Analysis error:', err)
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <main className="mx-auto -mt-16 max-w-6xl space-y-10 pb-20">
        <UploadForm onAnalyze={handleAnalyze} loading={loading} />
        {error && (
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
              <p className="text-red-700 dark:text-red-300">
                <strong>Error:</strong> {error}
              </p>
            </div>
          </div>
        )}
        <Results data={results} />
      </main>
      
      {/* Content Sections */}
      <AboutSection />
      <PrivacySection />
      <ContactSection />
      
      <Footer />
    </div>
  )
}
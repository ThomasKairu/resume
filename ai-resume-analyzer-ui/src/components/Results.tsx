import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

type ResultData = {
  matchScore: number // 0-100
  missingKeywords: string[]
  matchedKeywords: string[]
  suggestedAdditions: string
  analysisMethod?: string
}

export default function Results({ data }: { data: ResultData | null }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPDF = async () => {
    if (!data) return
    
    setIsExporting(true)
    
    try {
      console.log('Starting PDF export...')
      
      // Try html2canvas first
      if (containerRef.current) {
        try {
          const canvas = await html2canvas(containerRef.current, {
            scale: 1,
            backgroundColor: '#ffffff',
            logging: true
          })
          
          console.log('Canvas created successfully')
          
          const imgData = canvas.toDataURL('image/png')
          const pdf = new jsPDF('p', 'mm', 'a4')
          
          // Add header
          pdf.setFontSize(16)
          pdf.text('AI Resume Analysis Report', 10, 15)
          pdf.setFontSize(10)
          pdf.text(`Generated: ${new Date().toLocaleDateString()} | Score: ${data.matchScore}%`, 10, 25)
          
          // Add image
          const imgWidth = 190
          const imgHeight = (canvas.height * imgWidth) / canvas.width
          pdf.addImage(imgData, 'PNG', 10, 35, imgWidth, Math.min(imgHeight, 250))
          
          pdf.save(`resume-analysis-${Date.now()}.pdf`)
          console.log('PDF with image saved successfully')
          return
          
        } catch (canvasError) {
          console.warn('html2canvas failed, falling back to text-only PDF:', canvasError)
        }
      }
      
      // Fallback: Create text-only PDF
      console.log('Creating text-only PDF...')
      const pdf = new jsPDF('p', 'mm', 'a4')
      let yPos = 20
      
      // Title
      pdf.setFontSize(20)
      pdf.text('AI Resume Analysis Report', 10, yPos)
      yPos += 15
      
      // Date and score
      pdf.setFontSize(12)
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 10, yPos)
      yPos += 8
      pdf.text(`Match Score: ${data.matchScore}%`, 10, yPos)
      yPos += 15
      
      // Missing Keywords
      pdf.setFontSize(14)
      pdf.text('Missing Keywords:', 10, yPos)
      yPos += 8
      pdf.setFontSize(10)
      
      if (data.missingKeywords.length > 0) {
        data.missingKeywords.forEach(keyword => {
          if (yPos > 270) {
            pdf.addPage()
            yPos = 20
          }
          pdf.text(`• ${keyword}`, 15, yPos)
          yPos += 6
        })
      } else {
        pdf.text('• No critical keywords missing', 15, yPos)
        yPos += 6
      }
      
      yPos += 10
      
      // Matched Keywords
      pdf.setFontSize(14)
      pdf.text('Matched Keywords:', 10, yPos)
      yPos += 8
      pdf.setFontSize(10)
      
      if (data.matchedKeywords.length > 0) {
        data.matchedKeywords.forEach(keyword => {
          if (yPos > 270) {
            pdf.addPage()
            yPos = 20
          }
          pdf.text(`• ${keyword}`, 15, yPos)
          yPos += 6
        })
      }
      
      yPos += 10
      
      // Suggestions
      if (yPos > 250) {
        pdf.addPage()
        yPos = 20
      }
      
      pdf.setFontSize(14)
      pdf.text('Suggestions:', 10, yPos)
      yPos += 8
      pdf.setFontSize(10)
      
      // Split long text into lines
      const suggestions = pdf.splitTextToSize(data.suggestedAdditions, 180)
      suggestions.forEach(line => {
        if (yPos > 270) {
          pdf.addPage()
          yPos = 20
        }
        pdf.text(line, 10, yPos)
        yPos += 6
      })
      
      pdf.save(`resume-analysis-${Date.now()}.pdf`)
      console.log('Text-only PDF saved successfully')
      
    } catch (error) {
      console.error('PDF export error:', error)
      alert(`PDF export failed: ${error.message}. Please try again.`)
    } finally {
      setIsExporting(false)
    }
  }

  if (!data) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mx-auto my-10 max-w-5xl px-6"
    >
      <div ref={containerRef} className="rounded-xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Results</h2>
            <Typewriter text={data.suggestedAdditions} />
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow">{data.matchScore}%</span>
          </div>
        </div>

        <div className="mt-6">
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${data.matchScore}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-indigo-600 transition-all duration-700 ease-out"
            />
          </div>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Keyword Match Score</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-red-200/60 bg-red-50/40 p-4 dark:border-red-900/60 dark:bg-red-950/40">
            <h3 className="mb-2 text-lg font-semibold text-red-700 dark:text-red-300">Missing Keywords</h3>
            {data.missingKeywords.length ? (
              <ul className="list-inside list-disc space-y-1 text-red-700 dark:text-red-300">
                {data.missingKeywords.map((kw) => (
                  <li key={kw}>{kw}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-red-700/80 dark:text-red-300/80">No critical keywords missing.</p>
            )}
          </div>

          <div className="rounded-xl border border-emerald-200/60 bg-emerald-50/40 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/40">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">Suggested Additions</h3>
              <CopyButton text={data.suggestedAdditions} />
            </div>
            {data.matchedKeywords && data.matchedKeywords.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  <strong>Matched Keywords:</strong> {data.matchedKeywords.join(', ')}
                </p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  {data.suggestedAdditions}
                </p>
              </div>
            ) : (
              <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80">Looks solid. Consider minor adjustments for clarity.</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end">
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-slate-950 bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-500"
          >
            {isExporting ? (
              <>
                <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export PDF
              </>
            )}
          </button>
        </div>
      </div>
    </motion.section>
  )
}

function Typewriter({ text, speed = 20 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  const index = useRef(0)

  useEffect(() => {
    setDisplayed('')
    index.current = 0
    const id = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(index.current))
      index.current += 1
      if (index.current >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return (
    <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
      {displayed}
      <span className="ml-0.5 animate-pulse">▌</span>
    </p>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const label = useMemo(() => (copied ? 'Copied' : 'Copy'), [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <button onClick={copy} className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-slate-950 border border-slate-300 bg-transparent hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
      {label}
    </button>
  )
}
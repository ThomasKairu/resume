import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mx-auto my-16 max-w-4xl px-6"
    >
      <div className="rounded-xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 p-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">About AI Resume Analyzer</h2>
        
        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <p className="text-lg leading-relaxed">
            AI Resume Analyzer is a cutting-edge tool designed to help job seekers optimize their resumes for better job matching. 
            Using advanced artificial intelligence powered by Pollinations.AI, we provide intelligent analysis and personalized 
            recommendations to improve your chances of landing your dream job.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">🤖 AI-Powered Analysis</h3>
              <p>
                Our system uses state-of-the-art natural language processing to understand both your resume content 
                and job requirements, providing insights that go beyond simple keyword matching.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">🔒 Privacy First</h3>
              <p>
                Your data is never stored or shared. All analysis happens in real-time, and your resume content 
                is processed securely without any data retention.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">📊 Detailed Insights</h3>
              <p>
                Get comprehensive feedback including match scores, missing keywords, matched skills, 
                and actionable suggestions to improve your resume's effectiveness.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">📄 Export Reports</h3>
              <p>
                Generate professional PDF reports of your analysis that you can save, share, or reference 
                while updating your resume.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">How It Works</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Upload:</strong> Paste your resume text and the job description you're targeting</li>
              <li><strong>Analyze:</strong> Our AI processes both documents to identify matches and gaps</li>
              <li><strong>Review:</strong> Get detailed feedback with match scores and improvement suggestions</li>
              <li><strong>Optimize:</strong> Use the insights to refine your resume for better job matching</li>
              <li><strong>Export:</strong> Download a professional PDF report of your analysis</li>
            </ol>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
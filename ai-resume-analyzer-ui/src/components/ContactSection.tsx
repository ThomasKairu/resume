import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mx-auto my-16 max-w-4xl px-6"
    >
      <div className="rounded-xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 p-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">Contact Us</h2>
        
        <div className="space-y-8 text-slate-700 dark:text-slate-300">
          <p className="text-lg">
            We'd love to hear from you! Whether you have questions, feedback, or need support, 
            we're here to help make your resume analysis experience better.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Email</p>
                    <a href="mailto:support@airesume-analyzer.com" 
                       className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      support@airesume-analyzer.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Twitter</p>
                    <a href="https://twitter.com/airesume_analyzer" target="_blank" rel="noopener noreferrer"
                       className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      @airesume_analyzer
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">GitHub</p>
                    <a href="https://github.com/airesume-analyzer" target="_blank" rel="noopener noreferrer"
                       className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      github.com/airesume-analyzer
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Is my data secure?</h4>
                  <p className="text-sm">Yes! We don't store any of your resume data. Everything is processed in real-time and immediately discarded.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">How accurate is the AI analysis?</h4>
                  <p className="text-sm">Our AI uses advanced natural language processing to provide highly accurate keyword matching and contextual analysis.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Can I use this for multiple resumes?</h4>
                  <p className="text-sm">Absolutely! You can analyze as many resume-job combinations as you need. Each analysis is independent.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Is there a cost to use this service?</h4>
                  <p className="text-sm">Currently, our service is free to use. We're committed to helping job seekers improve their opportunities.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">Feedback & Suggestions</h3>
            <p>
              We're constantly improving our service. If you have ideas for new features, found a bug, 
              or just want to share your experience, we'd love to hear from you! Your feedback helps us 
              make the tool better for everyone.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-slate-500 dark:text-slate-400">
              We typically respond to inquiries within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
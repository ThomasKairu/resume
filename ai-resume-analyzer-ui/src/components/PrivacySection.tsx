import { motion } from 'framer-motion'

export default function PrivacySection() {
  return (
    <motion.section
      id="privacy"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mx-auto my-16 max-w-4xl px-6"
    >
      <div className="rounded-xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 p-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">Privacy Policy</h2>
        
        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
            <p className="text-emerald-800 dark:text-emerald-200 font-medium">
              🔒 <strong>Privacy-First Approach:</strong> We don't store, log, or retain any of your personal data or resume content.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">Data Processing</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>No Data Storage:</strong> Your resume text and job descriptions are processed in real-time and immediately discarded</li>
              <li><strong>Secure Processing:</strong> All analysis happens through encrypted connections</li>
              <li><strong>No User Accounts:</strong> We don't require registration or store user profiles</li>
              <li><strong>No Tracking:</strong> We don't use cookies or tracking pixels to monitor your activity</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">Third-Party Services</h3>
            <p>
              We utilize industry-leading AI services for text analysis and natural language processing. 
              These services are carefully selected for their security standards and privacy compliance. 
              Your data is processed through secure, encrypted connections and is not stored by any third-party providers. 
              All processing partners adhere to strict data protection standards and privacy regulations.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">Local Storage</h3>
            <p>
              We only store minimal preferences locally in your browser for user experience optimization. 
              This data never leaves your device and can be cleared at any time through your browser settings.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">Data Security</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>All communications are encrypted using HTTPS</li>
              <li>No sensitive data is logged or stored on our servers</li>
              <li>Rate limiting prevents abuse and ensures service availability</li>
              <li>Input validation protects against malicious content</li>
              <li>Enterprise-grade security measures protect all data in transit</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">Your Rights</h3>
            <p>
              Since we don't store any personal data, there's nothing to delete, modify, or export. Your privacy is 
              protected by design through our no-storage architecture. You maintain complete control over your data 
              at all times.
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">Questions?</h3>
            <p>
              If you have any questions about our privacy practices, please feel free to 
              <a href="#contact" className="text-indigo-600 dark:text-indigo-400 hover:underline"> contact us</a>.
            </p>
          </div>
          
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </motion.section>
  )
}
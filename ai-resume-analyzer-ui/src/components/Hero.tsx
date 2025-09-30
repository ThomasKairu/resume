
export default function Hero() {
  return (
<section className="bg-gradient-to-br from-primary to-accent">
  <div className="container mx-auto px-4 py-8">
    <div className="flex justify-center mb-8">
      <img
        src="/src/assets/logo.png"
        alt="AI Resume Analyzer Logo"
        className="w-32 h-32 md:w-48 md:h-48 animate-pulse"
      />
    </div>
    <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
      AI Resume Analyzer
    </h1>
    <p className="text-xl text-white/90 text-center mb-12">
      Optimize your resume against any job description...
    </p>
  </div>
</section>
  )
}

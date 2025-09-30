
export default function Hero() {
  return (
<section className="bg-gradient-to-br from-primary to-accent">
  <div className="container mx-auto px-4 py-8">
    <div className="flex justify-center items-center relative">
      <a href="/" className="w-12 h-12 md:w-16 md:h-16 absolute left-0">
        <img
          src="/logo.png"
          alt="AI Resume Analyzer Logo"
        />
      </a>
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
        AI Resume Analyzer
      </h1>
    </div>
    <p className="text-xl text-white/90 text-center mb-12">
      Optimize your resume against any job description...
    </p>
  </div>
</section>
  )
}

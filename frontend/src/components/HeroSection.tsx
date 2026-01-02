export default function HeroSection() {
  const scrollToPredict = () => {
    const element = document.getElementById('predict')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative pt-24 pb-20 overflow-hidden cinematic-bg">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full animate-pulse">
          <span className="text-amber-500 font-semibold text-sm">Powered by AI & Machine Learning</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <span className="text-white">Predict Movie</span>
          <br />
          <span className="text-gradient">Success</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-4">
          Harness the power of ensemble machine learning to predict IMDb ratings
        </p>
        <p className="text-lg md:text-xl text-amber-500 font-semibold mb-10">
          before your movie hits the screens
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-10">
          <div className="flex items-center space-x-2">
            <span className="text-amber-500 font-bold">✓</span>
            <span>Random Forest</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-amber-500 font-bold">✓</span>
            <span>XGBoost</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-amber-500 font-bold">✓</span>
            <span>Ensemble Model</span>
          </div>
        </div>

        <button
          onClick={scrollToPredict}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black text-lg rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 glow-effect"
        >
          Start Predicting →
        </button>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  )
}


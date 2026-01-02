export default function FeaturesSection() {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered',
      description: 'Advanced ensemble machine learning models combining Random Forest and XGBoost for accurate predictions',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Get predictions in milliseconds with our optimized FastAPI backend and efficient model inference',
    },
    {
      icon: '🎯',
      title: 'Highly Accurate',
      description: 'Trained on thousands of movie data points with ensemble weighting for the best possible results',
    },
  ]

  return (
    <section id="features" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-4">
          Why Choose <span className="text-gradient">Our Predictor?</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Experience the power of cutting-edge machine learning technology
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="movie-card p-8 rounded-xl glow-effect-hover transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



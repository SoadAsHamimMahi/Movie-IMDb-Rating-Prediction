export default function AboutSection() {
  const techStack = [
    'FastAPI',
    'React + TypeScript',
    'scikit-learn',
    'XGBoost',
    'Random Forest',
    'Tailwind CSS',
  ]

  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="movie-card p-10 md:p-16 rounded-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-center">
            About This <span className="text-gradient">Project</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                This IMDb Rating Predictor uses an ensemble of machine learning models trained on 
                thousands of movie data points. By combining Random Forest and XGBoost algorithms 
                with carefully tuned ensemble weights, we provide accurate predictions that help 
                filmmakers and movie enthusiasts understand potential audience reception.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                The model analyzes key features including genre, runtime, rating category, release year, 
                and total number of ratings to predict IMDb scores with high accuracy.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-3">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 bg-gray-900 border border-amber-500/20 rounded-lg text-center text-gray-300 font-medium hover:border-amber-500/40 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-amber-500 font-semibold text-sm mb-2">Model Architecture</p>
                <p className="text-gray-300 text-sm">
                  Ensemble Model: 40% Random Forest + 60% XGBoost
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}





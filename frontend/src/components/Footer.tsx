export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-black border-t border-amber-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎬</span>
              </div>
              <span className="text-xl font-black text-gradient">IMDb Predictor</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Advanced machine learning platform for predicting movie ratings using ensemble models.
              Built with FastAPI, React, and cutting-edge ML algorithms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('predict')}
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Predict Rating
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-white font-bold mb-4">Tech Stack</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>FastAPI</li>
              <li>React + TypeScript</li>
              <li>scikit-learn</li>
              <li>XGBoost</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} IMDb Rating Predictor. Built with ❤️ for movie enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  )
}




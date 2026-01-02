import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'
import AboutSection from './components/AboutSection'
import PredictionForm from './components/PredictionForm'
import PredictionResult from './components/PredictionResult'
import { PredictionResponse } from './types'

function App() {
  const [result, setResult] = useState<PredictionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePrediction = async (formData: {
    genre: string
    runtime: number
    rating_latter: string
    year: number
    total_numberof_rating: number
  }) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Prediction failed')
      }

      const data: PredictionResponse = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />

      {/* Main Prediction Section */}
      <section id="predict" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="movie-card rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Enter Movie <span className="text-gradient">Details</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Fill in the information below to get your prediction
            </p>
          </div>

          <PredictionForm onSubmit={handlePrediction} loading={loading} />

          {error && (
            <div className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm font-semibold">{error}</p>
            </div>
          )}

          {result && <PredictionResult result={result} />}
        </div>
      </section>

      <AboutSection />
      <Footer />
    </div>
  )
}

export default App


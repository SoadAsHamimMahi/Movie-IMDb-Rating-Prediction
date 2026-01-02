import { useEffect, useState } from 'react'
import { PredictionResponse } from '../types'

interface PredictionResultProps {
  result: PredictionResponse
}

export default function PredictionResult({ result }: PredictionResultProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [result])

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Super Hit':
        return 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-500'
      case 'Hit':
        return 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-500'
      case 'Flop':
        return 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500'
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700'
    }
  }

  return (
    <div
      className={`mt-8 p-8 movie-card rounded-xl border-2 border-amber-500/30 glow-effect transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <h2 className="text-3xl font-black text-white mb-6 text-center">
        Prediction Result
      </h2>

      <div className="text-center mb-8">
        <div className="inline-block">
          <div className="text-7xl font-black text-gradient mb-3">
            {result.predicted_rating}
          </div>
          <div className="text-sm text-gray-400 uppercase tracking-wider">
            Predicted IMDb Rating
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <span
          className={`px-8 py-4 rounded-full font-black text-xl border-2 ${getVerdictColor(
            result.verdict
          )} shadow-lg transform hover:scale-105 transition-transform`}
        >
          {result.verdict}
        </span>
      </div>
    </div>
  )
}


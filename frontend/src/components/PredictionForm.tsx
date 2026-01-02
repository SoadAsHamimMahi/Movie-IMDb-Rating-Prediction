import { useState, FormEvent } from 'react'

interface PredictionFormProps {
  onSubmit: (data: {
    genre: string
    runtime: number
    rating_latter: string
    year: number
    total_numberof_rating: number
    metascore?: number
  }) => void
  loading: boolean
}

const genres = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller',
  'War',
]

const ratingCategories = [
  'G',
  'PG',
  'PG-13',
  'R',
  'NC-17',
  'Unknown',
]

const currentYear = new Date().getFullYear()

export default function PredictionForm({ onSubmit, loading }: PredictionFormProps) {
  const [genre, setGenre] = useState('')
  const [runtime, setRuntime] = useState('')
  const [ratingLatter, setRatingLatter] = useState('')
  const [year, setYear] = useState('')
  const [totalRatings, setTotalRatings] = useState('')
  const [metascore, setMetascore] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!genre) newErrors.genre = 'Genre is required'
    if (!runtime || parseFloat(runtime) <= 0) {
      newErrors.runtime = 'Runtime must be greater than 0'
    }
    if (!ratingLatter) newErrors.ratingLatter = 'Rating category is required'
    if (!year) {
      newErrors.year = 'Year is required'
    } else {
      const yearNum = parseInt(year)
      if (yearNum < 1900 || yearNum > currentYear + 1) {
        newErrors.year = `Year must be between 1900 and ${currentYear + 1}`
      }
    }
    if (!totalRatings || parseFloat(totalRatings) < 0) {
      newErrors.totalRatings = 'Total ratings must be 0 or greater'
    }
    if (metascore && (parseFloat(metascore) < 0 || parseFloat(metascore) > 100)) {
      newErrors.metascore = 'Metascore must be between 0 and 100'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return

    const submitData: {
      genre: string
      runtime: number
      rating_latter: string
      year: number
      total_numberof_rating: number
      metascore?: number
    } = {
      genre,
      runtime: parseFloat(runtime),
      rating_latter: ratingLatter,
      year: parseInt(year),
      total_numberof_rating: parseFloat(totalRatings),
    }
    
    // Only include metascore if provided
    if (metascore && metascore.trim() !== '') {
      submitData.metascore = parseFloat(metascore)
    }
    
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Genre */}
        <div>
          <label htmlFor="genre" className="block text-sm font-semibold text-gray-300 mb-2">
            Genre <span className="text-amber-500">*</span>
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
              errors.genre ? 'border-red-500' : 'border-gray-700 hover:border-amber-500/50'
            }`}
            disabled={loading}
          >
            <option value="" className="bg-gray-900">Select a genre</option>
            {genres.map((g) => (
              <option key={g} value={g} className="bg-gray-900">
                {g}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="mt-1 text-sm text-red-400">{errors.genre}</p>
          )}
        </div>

        {/* Rating Latter */}
        <div>
          <label htmlFor="ratingLatter" className="block text-sm font-semibold text-gray-300 mb-2">
            Rating Category <span className="text-amber-500">*</span>
          </label>
          <select
            id="ratingLatter"
            value={ratingLatter}
            onChange={(e) => setRatingLatter(e.target.value)}
            className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
              errors.ratingLatter ? 'border-red-500' : 'border-gray-700 hover:border-amber-500/50'
            }`}
            disabled={loading}
          >
            <option value="" className="bg-gray-900">Select rating</option>
            {ratingCategories.map((r) => (
              <option key={r} value={r} className="bg-gray-900">
                {r}
              </option>
            ))}
          </select>
          {errors.ratingLatter && (
            <p className="mt-1 text-sm text-red-400">{errors.ratingLatter}</p>
          )}
        </div>

        {/* Runtime */}
        <div>
          <label htmlFor="runtime" className="block text-sm font-semibold text-gray-300 mb-2">
            Runtime (minutes) <span className="text-amber-500">*</span>
          </label>
          <input
            type="number"
            id="runtime"
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
            min="1"
            step="1"
            className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
              errors.runtime ? 'border-red-500' : 'border-gray-700 hover:border-amber-500/50'
            }`}
            placeholder="e.g., 120"
            disabled={loading}
          />
          {errors.runtime && (
            <p className="mt-1 text-sm text-red-400">{errors.runtime}</p>
          )}
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block text-sm font-semibold text-gray-300 mb-2">
            Release Year <span className="text-amber-500">*</span>
          </label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="1900"
            max={currentYear + 1}
            step="1"
            className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
              errors.year ? 'border-red-500' : 'border-gray-700 hover:border-amber-500/50'
            }`}
            placeholder={`e.g., ${currentYear}`}
            disabled={loading}
          />
          {errors.year && (
            <p className="mt-1 text-sm text-red-400">{errors.year}</p>
          )}
        </div>

        {/* Total Ratings */}
        <div>
          <label htmlFor="totalRatings" className="block text-sm font-semibold text-gray-300 mb-2">
            Total Number of Ratings <span className="text-amber-500">*</span>
          </label>
          <input
            type="number"
            id="totalRatings"
            value={totalRatings}
            onChange={(e) => setTotalRatings(e.target.value)}
            min="0"
            step="1"
            className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
              errors.totalRatings ? 'border-red-500' : 'border-gray-700 hover:border-amber-500/50'
            }`}
            placeholder="e.g., 50000"
            disabled={loading}
          />
          {errors.totalRatings && (
            <p className="mt-1 text-sm text-red-400">{errors.totalRatings}</p>
          )}
        </div>

        {/* Metascore */}
        <div>
          <label htmlFor="metascore" className="block text-sm font-semibold text-gray-300 mb-2">
            Metascore <span className="text-gray-500 text-xs">(optional)</span>
          </label>
          <input
            type="number"
            id="metascore"
            value={metascore}
            onChange={(e) => setMetascore(e.target.value)}
            min="0"
            max="100"
            step="1"
            className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
              errors.metascore ? 'border-red-500' : 'border-gray-700 hover:border-amber-500/50'
            }`}
            placeholder="e.g., 65 (0-100)"
            disabled={loading}
          />
          {errors.metascore && (
            <p className="mt-1 text-sm text-red-400">{errors.metascore}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Note: Models need to be retrained to use Metascore feature
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold py-4 px-6 rounded-lg hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] glow-effect"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Predicting...
          </span>
        ) : (
          '🎬 Predict IMDb Rating'
        )}
      </button>
    </form>
  )
}


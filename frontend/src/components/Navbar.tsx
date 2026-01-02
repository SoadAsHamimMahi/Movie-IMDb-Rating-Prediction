import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-amber-500/20'
          : 'bg-black/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform">
              <span className="text-2xl">🎬</span>
            </div>
            <span className="text-xl font-black text-gradient">IMDb Predictor</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-300 hover:text-amber-500 transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('predict')}
              className="text-gray-300 hover:text-amber-500 transition-colors font-medium"
            >
              Predict
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-amber-500 transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('predict')}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 glow-effect"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-amber-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-amber-500 hover:bg-gray-900 rounded-lg transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('predict')}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-amber-500 hover:bg-gray-900 rounded-lg transition-colors"
            >
              Predict
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-amber-500 hover:bg-gray-900 rounded-lg transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('predict')}
              className="block w-full text-left px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-lg mt-2"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}





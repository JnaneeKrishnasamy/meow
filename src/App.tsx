import React, { useState, useEffect } from 'react'
import { Sun, Heart, Star, Sparkles, RefreshCw, Calendar, Clock, Share2 } from 'lucide-react'

interface Message {
  id: number
  text: string
  author?: string
  category: 'motivation' | 'gratitude' | 'self-love' | 'success' | 'mindfulness'
}

const positiveMessages: Message[] = [
  { id: 1, text: "Today is a new beginning. Embrace the possibilities that await you.", category: 'motivation' },
  { id: 2, text: "You are stronger than you think and more capable than you imagine.", category: 'self-love' },
  { id: 3, text: "Every small step forward is progress worth celebrating.", category: 'motivation' },
  { id: 4, text: "Your kindness creates ripples of positivity in the world.", category: 'gratitude' },
  { id: 5, text: "Believe in yourself - you have everything you need to succeed.", category: 'success' },
  { id: 6, text: "Take a moment to breathe and appreciate this present moment.", category: 'mindfulness' },
  { id: 7, text: "You are worthy of love, happiness, and all good things.", category: 'self-love' },
  { id: 8, text: "Challenges are opportunities for growth and learning.", category: 'motivation' },
  { id: 9, text: "Your unique perspective makes the world a more beautiful place.", category: 'gratitude' },
  { id: 10, text: "Success is not a destination, but a journey of continuous growth.", category: 'success' },
  { id: 11, text: "Peace begins with a smile and a grateful heart.", category: 'mindfulness' },
  { id: 12, text: "You have the power to create positive change in your life.", category: 'motivation' },
  { id: 13, text: "Every day you choose kindness, you make the world brighter.", category: 'gratitude' },
  { id: 14, text: "Trust the process - you are exactly where you need to be.", category: 'mindfulness' },
  { id: 15, text: "Your dreams are valid and achievable with persistence and faith.", category: 'success' }
]

const categoryColors = {
  motivation: 'from-orange-400 to-pink-500',
  gratitude: 'from-green-400 to-blue-500',
  'self-love': 'from-pink-400 to-purple-500',
  success: 'from-yellow-400 to-orange-500',
  mindfulness: 'from-blue-400 to-indigo-500'
}

const categoryIcons = {
  motivation: Star,
  gratitude: Heart,
  'self-love': Sparkles,
  success: Sun,
  mindfulness: Calendar
}

function App() {
  const [currentMessage, setCurrentMessage] = useState<Message>(positiveMessages[0])
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Set initial message based on day of year to ensure consistency
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    const messageIndex = dayOfYear % positiveMessages.length
    setCurrentMessage(positiveMessages[messageIndex])

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const getNewMessage = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * positiveMessages.length)
      setCurrentMessage(positiveMessages[randomIndex])
      setIsAnimating(false)
    }, 300)
  }

  const shareMessage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Positivity',
          text: currentMessage.text,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(currentMessage.text)
      alert('Message copied to clipboard!')
    }
  }

  const CategoryIcon = categoryIcons[currentMessage.category]
  const gradientClass = categoryColors[currentMessage.category]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
                <Sun className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Daily Positivity
            </h1>
            <p className="text-gray-600 text-lg">
              Start each day with uplifting messages to brighten your mood
            </p>
            <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Message Card */}
        <div className="mb-12">
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradientClass} p-1 shadow-2xl transition-all duration-500 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <div className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className={`p-4 bg-gradient-to-r ${gradientClass} rounded-full text-white`}>
                    <CategoryIcon className="w-8 h-8" />
                  </div>
                </div>
                
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed mb-8">
                  "{currentMessage.text}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  <span className={`px-4 py-2 bg-gradient-to-r ${gradientClass} text-white rounded-full text-sm font-medium capitalize`}>
                    {currentMessage.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
          <button
            onClick={getNewMessage}
            disabled={isAnimating}
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
            <span>New Message</span>
          </button>
          
          <button
            onClick={shareMessage}
            className="flex items-center space-x-2 px-8 py-4 bg-white text-gray-700 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-gray-200"
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Inspiration</h3>
            <p className="text-gray-600 text-sm">
              Receive a new positive message every day to start your morning right
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Mindful Moments</h3>
            <p className="text-gray-600 text-sm">
              Take a pause and reflect on uplifting thoughts throughout your day
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Growth</h3>
            <p className="text-gray-600 text-sm">
              Build confidence and cultivate a positive mindset with daily affirmations
            </p>
          </div>
        </div>

        {/* Inspirational Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Peaceful mountain landscape at sunrise"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Find Your Inner Peace</h3>
              <p className="text-lg opacity-90">
                Every sunrise brings new opportunities for growth and happiness
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600 mb-4">
            Spread positivity and make each day a little brighter ✨
          </p>
          <p className="text-sm text-gray-500">
            Built with love using React and TypeScript
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

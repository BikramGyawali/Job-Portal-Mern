import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../common/Loading'
import api from '../../../../utils/axiosInstance'

function AIRecruitment() {
  const [isPremium, setIsPremium] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const check = async () => {
      try {
        const { data } = await api.get("/api/payment/status")
        setIsPremium(data.isPremium)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    check()
  }, [])

  if (isLoading) return <Loading />

  // Locked state
  if (!isPremium) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-white rounded-2xl shadow-lg p-10 max-w-md w-full">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            AI Recruitment is Locked
          </h2>
          <p className="text-gray-500 mb-6">
            Upgrade to Premium to unlock AI Recruitment and all other features.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-yellow-700 font-semibold text-sm mb-2">
              ⭐ Premium includes:
            </p>
            <ul className="text-yellow-600 text-sm space-y-1">
              <li>✓ AI Recruitment tools</li>
              <li>✓ Featured badge on job posts</li>
              <li>✓ Priority support</li>
            </ul>
          </div>
          <button
            onClick={() => navigate('/employer/premium')}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl transition"
          >
            ⭐ Upgrade — NPR 999 / 30 days
          </button>
        </div>
      </div>
    )
  }

  // Unlocked state
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow p-8 text-center">
        <div className="text-5xl mb-4">🤖</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to AI Recruitment
        </h1>
        <p className="text-gray-500">
          Your AI recruitment tools are now active.
        </p>
      </div>
    </div>
  )
}

export default AIRecruitment
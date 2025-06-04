'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function Login() {
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) console.error('Google login error:', error)
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Logout error:', error)
    else setUser(null)
  }

  if (!user) {
    return (
        <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
            onClick={handleLogin}
        >
        Sign in with Google
      </Button>
    )
  }

  return (
    <div className="relative inline-block text-left">
      <Button
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        {user.user_metadata.full_name || user.email}
      </Button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg border z-10">
          <a
            href="/profile"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Profile
          </a>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

<Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                    Subscribe
                  </Button>
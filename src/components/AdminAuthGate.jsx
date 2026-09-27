import React, { useState, useEffect, createContext, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Mail, Key, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle, LogOut } from 'lucide-react'
import { supabase } from '../lib/supabase'

// Supabase Auth user allowed to manage blog content.
const AUTH_EMAIL = 'sahedalomsumit@gmail.com'

const AdminAuthContext = createContext({
  isAuthenticated: false,
  userEmail: '',
  logout: () => {}
})

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}

export default function AdminAuthGate({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  
  // Login form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isAuthorizedUser = (user) => user?.email?.toLowerCase() === AUTH_EMAIL.toLowerCase()

  // Verify the server-issued Supabase session instead of trusting browser storage.
  useEffect(() => {
    if (!supabase) {
      setCheckingAuth(false)
      return undefined
    }

    let active = true
    supabase.auth.getUser()
      .then(({ data: { user } }) => {
        if (active) setIsAuthenticated(isAuthorizedUser(user))
      })
      .catch(() => {
        if (active) setIsAuthenticated(false)
      })
      .finally(() => {
        if (active) setCheckingAuth(false)
      })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setIsAuthenticated(isAuthorizedUser(session?.user))
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!supabase) {
      setError('Supabase is not configured. Add the public URL and anon key to enable secure admin sign-in.')
      setIsLoading(false)
      return
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (signInError || !isAuthorizedUser(data.user)) {
      await supabase.auth.signOut()
      setError('Invalid administrative credentials. Access denied.')
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }

  const logout = async () => {
    await supabase?.auth.signOut()
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
  }

  if (checkingAuth) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin mb-4" />
        <span className="font-mono text-xs uppercase tracking-widest text-emerald-500">
          Verifying_Administrative_Session...
        </span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center relative">
        <div className="w-full max-w-md">
          {/* Back link */}
          <div className="mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-emerald-400 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Blog</span>
            </Link>
          </div>

          {/* Card */}
          <div className="bento-card p-8 sm:p-10 border-white/10 bg-[#080808]/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 shadow-inner">
                <Lock className="w-5 h-5" />
              </div>

              <div className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest font-bold mb-2">
                Restricted_Area // Security_Gate
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight italic mb-3">
                Blog Studio Admin
              </h1>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-8">
                Please provide your administrative master credentials to manage, edit, or publish blogs.
              </p>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-400 text-xs animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john.snow@example.com"
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                    Security Passkey
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••••••"
                      autoComplete="current-password"
                      className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl font-mono text-xs uppercase tracking-widest font-black bg-emerald-500 text-black hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-6 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Unlock Blog Studio</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, userEmail: AUTH_EMAIL, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

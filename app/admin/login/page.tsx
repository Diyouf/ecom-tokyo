'use client'

import { useState, FormEvent, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ShoppingBag, Lock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? '/admin'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push(from)
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error ?? 'Invalid password')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="admin-password" className="block text-sm font-medium text-white/70 mb-2">
          Admin Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="input-field pl-10"
            required
            autoComplete="current-password"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        loading={loading}
        className="w-full"
        id="admin-login-submit"
      >
        Sign In
      </Button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="glass-card p-8 space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-4 glow-red">
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-white/40 text-sm mt-1">TOKYO Sports — Store Management</p>
          </div>

          {/* Form wrapper */}
          <Suspense fallback={<div className="text-white/40 text-center py-4">Loading login form...</div>}>
            <LoginForm />
          </Suspense>

          <p className="text-center text-white/20 text-xs">
            Default password: <code className="text-white/40">admin123</code>
            <br />Change via <code className="text-white/40">ADMIN_PASSWORD</code> env var
          </p>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useRef, ChangeEvent } from 'react'
import Image from 'next/image'
import { Upload, X, Link, AlertCircle } from 'lucide-react'
import { Button } from './Button'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = 'Product Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'url' | 'upload'>('url')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    // Validate file size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      setError('File too large. Maximum size is 5MB.')
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
      return
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.')
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
      return
    }

    try {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        onChange(base64)
        setUploading(false)
      }
      reader.onerror = () => {
        setError('Failed to convert image.')
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch {
      setError('Failed to convert image. Please try again.')
      setUploading(false)
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white/70">{label}</label>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            mode === 'url' ? 'bg-primary text-white' : 'bg-dark-100 text-white/50 hover:text-white'
          }`}
        >
          <Link className="w-3.5 h-3.5" />
          Paste URL
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            mode === 'upload' ? 'bg-primary text-white' : 'bg-dark-100 text-white/50 hover:text-white'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          Upload File
        </button>
      </div>

      {/* URL input */}
      {mode === 'url' && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="input-field"
        />
      )}

      {/* File upload */}
      {mode === 'upload' && (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
            id="image-file-input"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full border-2 border-dashed border-white/20 hover:border-primary/50 rounded-xl p-8 flex flex-col items-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-8 h-8 text-white/30" />
            <div className="text-center">
              <div className="text-white/70 text-sm font-medium">
                {uploading ? 'Uploading...' : 'Click to upload image'}
              </div>
              <div className="text-white/30 text-xs mt-1">JPEG, PNG, WebP, GIF · Max 5MB</div>
            </div>
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative rounded-xl overflow-hidden bg-dark-100 aspect-video">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => setError('Failed to load image. Please check the URL.')}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-dark/80 hover:bg-red-500/80 text-white rounded-lg p-1.5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

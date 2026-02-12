import React from 'react'

interface YTEmbedProps {
  /** Full YouTube URL (e.g. https://youtu.be/ID or https://www.youtube.com/watch?v=ID). If omitted, the component will try to read the URL from children when it's a string. */
  url?: string
  className?: string
  /** If provided, sets the iframe title for accessibility. */
  title?: string
  allowFullScreen?: boolean
  autoplay?: boolean
}

function parseTimeParam(t?: string | null): string | undefined {
  if (!t) return undefined
  // plain seconds like "90"
  if (/^\d+$/.test(t)) return t
  // formats like 1h2m3s or 2m30s or 45s
  let seconds = 0
  const h = t.match(/(\d+)h/)
  const m = t.match(/(\d+)m/)
  const s = t.match(/(\d+)s/)
  if (h) seconds += parseInt(h[1], 10) * 3600
  if (m) seconds += parseInt(m[1], 10) * 60
  if (s) seconds += parseInt(s[1], 10)
  return seconds ? String(seconds) : undefined
}

function parseYouTubeId(input?: string | null): { id: string | null; start?: string } {
  if (!input) return { id: null }
  const trimmed = input.trim()
  try {
    const url = new URL(trimmed)
    const host = url.hostname.toLowerCase()
    if (host.includes('youtu.be')) {
      const id = url.pathname.slice(1)
      const start = parseTimeParam(url.searchParams.get('t') || url.searchParams.get('start'))
      return { id: id || null, start }
    }
    if (host.includes('youtube.com')) {
      const p = url.pathname
      if (p.startsWith('/watch')) {
        const id = url.searchParams.get('v')
        const start = parseTimeParam(url.searchParams.get('t') || url.searchParams.get('start'))
        return { id: id || null, start }
      }
      if (p.startsWith('/embed/')) {
        const id = p.split('/embed/')[1]
        const start = parseTimeParam(url.searchParams.get('start') || url.searchParams.get('t'))
        return { id: id || null, start }
      }
      if (p.startsWith('/shorts/')) {
        const id = p.split('/shorts/')[1]
        return { id: id || null }
      }
    }
  } catch (e) {
    // fall through to regex-based parsing below for non-URL strings
  }

  // Fallback regex: handles many common YouTube URL shapes
  const match = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  const id = match ? match[1] : null
  const tMatch = trimmed.match(/[?&]t=(\d+)|[?&]start=(\d+)/)
  const start = tMatch ? (tMatch[1] || tMatch[2]) : undefined
  return { id, start }
}

const YTEmbed: React.FC<YTEmbedProps> = ({
  url,
  className = '',
  title = 'YouTube video',
  allowFullScreen = true,
  autoplay = false,
}) => {
  if (!url) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('YTEmbed: missing `url` prop')
    }
    return null
  }

  const { id, start } = parseYouTubeId(url)
  if (!id) {
    return (
      <div className={className}>
        <a href={String(url)} target="_blank" rel="noopener noreferrer">
          Open video
        </a>
      </div>
    )
  }

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
  })

  if (start) params.set('start', start)

  if (autoplay) {
    params.set('autoplay', '1')
    params.set('mute', '1') // autoplay requires mute
  }

  const src = `https://www.youtube.com/embed/${encodeURIComponent(
    id
  )}?${params.toString()}`

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <iframe
        src={src}
        title={title}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={allowFullScreen}
      />
    </div>
  )
}

export default YTEmbed
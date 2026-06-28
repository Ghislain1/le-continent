export default function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-900">
      <div className="text-center">
        <svg
          className="w-12 h-12 mx-auto text-gold-400 animate-spin-slow"
          viewBox="0 0 50 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M25 2 L48 12 L48 30 Q48 45 25 58 Q2 45 2 30 L2 12 Z" />
        </svg>
        <p className="font-body text-cream-100/40 text-sm tracking-widest uppercase mt-4">Loading...</p>
      </div>
    </div>
  )
}

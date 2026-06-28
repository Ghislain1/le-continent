import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-charcoal-900 px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gold-400/40 flex items-center justify-center">
              <span className="font-heading text-gold-400 text-2xl">!</span>
            </div>
            <h1 className="font-heading text-2xl text-gold-400 mb-3">Something went wrong</h1>
            <p className="text-cream-100/60 text-sm font-body mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full border border-gold-400 text-gold-400 text-sm tracking-widest uppercase font-body font-medium hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

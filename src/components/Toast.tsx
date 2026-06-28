import { useState, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { ToastContext, type Toast, type ToastType } from '../hooks/useToast'

let nextId = 0

const iconMap: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const borderColorMap: Record<ToastType, string> = {
  success: 'border-green-500/50',
  error: 'border-red-500/50',
  info: 'border-gold-400/50',
}

const iconColorMap: Record<ToastType, string> = {
  success: 'text-green-400',
  error: 'text-red-400',
  info: 'text-gold-400',
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: number) => void }) {
  const Icon = iconMap[toast.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className={`flex items-start gap-3 px-4 py-3 rounded-xl bg-charcoal-800 border ${borderColorMap[toast.type]} shadow-lg shadow-black/40 min-w-72 max-w-sm`}
    >
      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${iconColorMap[toast.type]}`} />
      <p className="flex-1 text-sm text-cream-100/80 font-body">{toast.message}</p>
      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        className="p-0.5 rounded text-cream-100/30 hover:text-cream-100 transition-colors cursor-pointer"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = nextId++
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 4000)
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem toast={toast} onRemove={removeToast} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

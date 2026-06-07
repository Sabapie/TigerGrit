import { useEffect } from 'react'

function Toast({ message, type = 'success', onClose }) {

  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [])

  const styles = {
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
  }

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-sm shadow-xl transition-all duration-300 ${styles[type]}`}>
      <span className="text-lg font-bold">{icons[type]}</span>
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}

export default Toast
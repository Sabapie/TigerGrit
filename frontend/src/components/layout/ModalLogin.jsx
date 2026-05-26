import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AuthModal({ isOpen, onClose }) {

  const navigate = useNavigate()
  const [tab, setTab] = useState('login')

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register state
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setError('')
    setLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email: loginEmail, password: loginPassword }
      )
      localStorage.setItem('token', response.data.token)
      onClose()
      navigate('/dashboard')
    } catch (err) {
      setError('Email o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  const register = async () => {
    setError('')
    setLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        { name: registerName, email: registerEmail, password: registerPassword }
      )
      localStorage.setItem('token', response.data.token)
      onClose()
      navigate('/dashboard')
    } catch (err) {
      setError('Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Cabecera */}
        <div style={styles.header}>
          <span style={styles.logo}>TigerGrit</span>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{ ...styles.tab, ...(tab === 'login' ? styles.tabActive : {}) }}
            onClick={() => { setTab('login'); setError('') }}
          >
            Iniciar sesión
          </button>
          <button
            style={{ ...styles.tab, ...(tab === 'register' ? styles.tabActive : {}) }}
            onClick={() => { setTab('register'); setError('') }}
          >
            Crear cuenta
          </button>
        </div>

        {/* Formulario Login */}
        {tab === 'login' && (
          <div style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                type="email"
                placeholder="tu@email.com"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Contraseña</label>
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.submitBtn} onClick={login} disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            <p style={styles.switchText}>
              ¿No tienes cuenta?{' '}
              <span style={styles.switchLink} onClick={() => setTab('register')}>
                Regístrate
              </span>
            </p>
          </div>
        )}

        {/* Formulario Register */}
        {tab === 'register' && (
          <div style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Nombre</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Tu nombre"
                onChange={(e) => setRegisterName(e.target.value)}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                type="email"
                placeholder="tu@email.com"
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Contraseña</label>
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.submitBtn} onClick={register} disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
            <p style={styles.switchText}>
              ¿Ya tienes cuenta?{' '}
              <span style={styles.switchLink} onClick={() => setTab('login')}>
                Inicia sesión
              </span>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#e8ff4d',
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '-0.02em',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#555',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '4px 8px',
  },
  tabs: {
    display: 'flex',
    background: '#252525',
    borderRadius: '8px',
    padding: '4px',
    gap: '4px',
  },
  tab: {
    flex: 1,
    padding: '0.5rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    color: '#666',
    fontSize: '0.875rem',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.15s',
  },
  tabActive: {
    background: '#2f2f2f',
    color: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    color: '#888',
    fontSize: '0.78rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  input: {
    background: '#252525',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '0.65rem 0.85rem',
    color: '#f5f5f5',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  error: {
    color: '#ff6b6b',
    fontSize: '0.85rem',
    margin: 0,
  },
  submitBtn: {
    background: '#e8ff4d',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem',
    color: '#0f0f0f',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '0.25rem',
  },
  switchText: {
    color: '#555',
    fontSize: '0.85rem',
    textAlign: 'center',
    margin: 0,
  },
  switchLink: {
    color: '#e8ff4d',
    cursor: 'pointer',
    fontWeight: 500,
  },
}

export default AuthModal

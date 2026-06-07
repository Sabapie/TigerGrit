import { useLocation } from 'react-router-dom'

function Footer() {
  const location = useLocation()
  if (location.pathname === '/community') return null

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">

        {/* Logo */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-tigergrit font-black text-xl mb-2">TigerGrit</h3>
          <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
            Tu espacio para entrenar, crecer y alcanzar tus metas.
          </p>
          <div className="flex gap-3 mt-4">
            {['f', 'in', '𝕏', '📷'].map((icon, i) => (
              <button key={i} className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-tigergrit hover:text-zinc-900 text-zinc-400 text-xs font-bold transition flex items-center justify-center">
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Plataforma */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Plataforma</h4>
          <div className="flex flex-col gap-2">
            {['Inicio', 'Perfil', 'Calendario'].map(link => (
              <span key={link} className="text-zinc-500 text-sm hover:text-tigergrit cursor-pointer transition">{link}</span>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Legal</h4>
          <div className="flex flex-col gap-2">
            {['Términos de Uso', 'Privacidad', 'Cookies'].map(link => (
              <span key={link} className="text-zinc-500 text-sm hover:text-tigergrit cursor-pointer transition">{link}</span>
            ))}
          </div>
        </div>

      </div>

      <div className="border-t border-zinc-800 pt-6 text-center">
        <p className="text-zinc-600 text-xs">© 2024 TigerGrit. Todos los derechos reservados.</p>
      </div>
    </footer>
  )

}

export default Footer 
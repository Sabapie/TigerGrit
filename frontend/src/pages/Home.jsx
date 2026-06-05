import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import WelImg from '/Wellcome.jpg'
import OrgImg from '/Organization.jpg'
import ComImg from '/Community.jpg'
import IsologotipoTigerGrit from '/Isologotipo-TigerGrit.png'
import Button from '../components/ui/Button'
import Footer from '../components/layout/Footer'
import AuthModal from '../components/layout/ModalLogin'


function Home() {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [authOpen, setAuthOpen] = useState(false)

  // Si hay sesion entras, si no, login
  const handleClick = () => {
    if (token) {
      navigate('/calendar')
    } else {
      setAuthOpen(true)
    }
  }


  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* INTRODUCCION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20">

        {/* FONDO */}
        <div className="absolute inset-0 bg-zinc-900">
          <img src={WelImg} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-black/50" /> {/* Capa para oscurecer las imagenes */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-zinc-950" />
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto ">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-10">
            Bienvenido a{' '}
            <img src={IsologotipoTigerGrit} className="mt-10 " alt="" />
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Tu espacio para entrenar, crecer y alcanzar tus metas.
          </p>
          <Button
            onClick={handleClick}
            variant='primary'
            className="bg-tigergrit hover:bg-tigergrit/90 text-zinc-900 font-bold px-8 py-3 rounded-xl transition active:scale-95 text-lg shadow-lg shadow-tigergrit/20"
          >
            {token ? 'Comenzar Entrenamiento' : 'Iniciar Sesión'}

          </Button>
        </div>

      </section>

      {/* QUE SOMOS */}
      <section className="py-24 px-6 ">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">
            Qué <span className="text-tigergrit">Somos</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Una plataforma para los amantes del fitness. Desde esta web puedes gestionar tus ejercicios y rutinas junto a una gran comunidad.
          </p>
        </div>
      </section>

      {/* ORGANIZACIÓN */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-1 md:order-1">
            <h2 className="text-4xl font-black mb-4">Organización</h2>
            <p className="text-zinc-400 leading-relaxed">
              Elige entre todos los ejercicios de nuestra base de datos. No te quedes en la superficie, crea tus propios ejercicios si lo deseas, con tus propios tiempos y repeticiones personalizadas.
            </p>
          </div>
          <div className="order-2 md:order-2 h-72 rounded-md overflow-hidden relative bg-zinc-800 border border-zinc-700">
            <img src={OrgImg} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" /> {/* Capa para oscurecer las imagenes */}
            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-5xl"></div>
          </div>
        </div>
      </section>

      {/* COMUNIDAD */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="h-72 order-1 md:order-1 rounded-md relative overflow-hidden bg-zinc-800 border border-zinc-700">
            <img src={ComImg} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" /> {/* Capa para oscurecer las imagenes */}
            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-5xl"></div>
          </div>
          <div className='order-2 md:order-2'>
            <h2 className="text-4xl font-black mb-4">Comunidad</h2>
            <p className="text-zinc-400 leading-relaxed">
              Con nuestro chat podrás hablar con miles de personas, crear chats de grupo y unirte a una comunidad donde podrás aprender y ayudar a miles de personas a lograr sus objetivos.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="py-24 px-6 bg-zinc-900/50">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black mb-2">
              <span className="text-tigergrit">Contacto</span>
            </h2>
            <p className="text-zinc-400">¿Tienes alguna pregunta? Estamos aquí para ayudarte.</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-zinc-500 text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="text-tigergrit">✉</span> Email
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit focus:border-tigergrit transition placeholder:text-zinc-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-zinc-500 text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="text-tigergrit">✉</span> Mensaje
              </label>
              <textarea
                placeholder="Escribe tu mensaje aquí..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit focus:border-tigergrit transition placeholder:text-zinc-600 resize-none font-sans"
              />
            </div>
            <button className="bg-tigergrit hover:bg-tigergrit/90 text-zinc-900 font-bold py-3 rounded-xl transition active:scale-95 flex items-center justify-center gap-2">
              <span>✉</span> Enviar Mensaje
            </button>
          </div>
        </div>
      </section>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  )
}

export default Home

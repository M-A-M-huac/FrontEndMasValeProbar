import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Header from './components/Header'
import PersonajesGrid from './components/PersonajesGrid'
import Contact from './components/Contact'
import UsuarioPage from './components/UsuarioPage'

const App = () => {

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] =useState(true)
  const [query, setQuery] = useState('')
  const [user, setUser] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('mvp_user'))
      if (raw && (raw._id || raw.id) && raw.name) return raw
      try { localStorage.removeItem('mvp_user') } catch {}
      return null
    } catch { return null }
  })

  useEffect(()=>{

    const fetchItems = async (q = '') => {
      try {
        const url = `/api/external/search?q=${encodeURIComponent(q)}`
        const resultado = await axios.get(url)
        setItems(resultado.data.meals || [])
      } catch (error) {
        setItems([])
      }
      setIsLoading(false)
    }

    fetchItems()
  },[])

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const url = `/api/external/search?q=${encodeURIComponent(query)}`
      const resultado = await axios.get(url)
      setItems(resultado.data.meals || [])
    } catch (error) {
      setItems([])
    }
    setIsLoading(false)
  }

  if (window.location.pathname === '/usuario') {
    return <UsuarioPage onLogin={(u)=>{ setUser(u); try { localStorage.setItem('mvp_user', JSON.stringify(u)) } catch{}; window.location.href = '/' }} />
  }

  return (
    <div className='container py-4'>
      <Header user={user} onLogout={() => { setUser(null); try { localStorage.removeItem('mvp_user') } catch {} }} />

      <section id="objetivo" className="my-4">
        <div className="p-4 rounded" style={{backgroundColor:'#000', color:'#fff'}}>
          <h2>¿Para que lo hacemos?</h2>
          <p>Usando la API pública de TheMealDB, este sitio muestra recetas, permite realizar búsquedas y contiene una sección de contacto; ideal para familias o gente que quiere probar algo nuevo.</p>
        </div>
      </section>

      <section id="recetas" className="my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Recetas</h2>
          <form className="d-flex" onSubmit={handleSearch}>
            <input className="form-control me-2 bg-dark text-light border-secondary" type="search" placeholder="Buscar receta" aria-label="Buscar" value={query} onChange={(e)=>setQuery(e.target.value)} />
            <button className="btn btn-outline-light" type="submit">Buscar</button>
          </form>
        </div>

        <PersonajesGrid isLoading={isLoading} items={items} user={user} />
      </section>

      <Contact />

      <section id="sobre-nosotros" className="my-4">
        <div className="p-4 rounded" style={{backgroundColor:'#000', color:'#fff'}}>
          <h2>Sobre nosotros</h2>
          <p> Soy Matías A. M. y esta página se creó para el primer parcial de Programación en Internet, con el objetivo de ayudar a familias y gente que quiera probar recetas nuevas.</p>
        </div>
      </section>

    </div>
      
  )
}

export default App

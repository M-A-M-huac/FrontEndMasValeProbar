import React, {useState} from 'react'
import axios from 'axios'

const UsuarioPage = ({onLogin}) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/users', { name, password })
      if (res && res.data && (res.status === 201 || res.status === 200) && res.data._id) {
        try { localStorage.setItem('mvp_user', JSON.stringify(res.data)) } catch {}
        if (onLogin) onLogin(res.data)
        alert('Usuario creado y logueado')
      } else {
        alert(res.data?.message || 'Respuesta inesperada del servidor')
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error creando usuario')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/users/login', { name, password })
      if (res && res.data && res.data._id) {
        try { localStorage.setItem('mvp_user', JSON.stringify(res.data)) } catch {}
        if (onLogin) onLogin(res.data)
        alert('Login exitoso')
      } else {
        alert(res.data?.message || 'Respuesta inesperada del servidor')
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Credenciales inválidas')
    }
  }

  return (
    <div className="container py-5">
      <h2>Usuario</h2>
      <form className="w-50" onSubmit={(e)=>e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Clave</label>
          <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={handleLogin}>Ingresar</button>
          <button className="btn btn-secondary" onClick={handleCreate}>Crear cuenta</button>
        </div>
      </form>
    </div>
  )
}

export default UsuarioPage

import React, {useState} from 'react'
import axios from 'axios'

const UserForm = ({onCreate}) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/users', { name, password })
      setName('')
      setPassword('')
      if (res && res.data && (res.status === 201 || res.status === 200) && res.data._id) {
        try { localStorage.setItem('mvp_user', JSON.stringify(res.data)) } catch {}
        if (onCreate) onCreate(res.data)
        alert('Usuario creado y seleccionado')
      } else {
        alert(res.data?.message || 'Respuesta inesperada del servidor')
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error creando usuario')
    }
  }

  return (
    <form className="d-flex gap-2 align-items-center" onSubmit={handleSubmit}>
      <input required className="form-control" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
      <input required type="password" className="form-control" placeholder="Clave" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn btn-primary" type="submit">Crear / Entrar</button>
    </form>
  )
}

export default UserForm

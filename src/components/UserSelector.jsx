import React, {useEffect, useState} from 'react'
import axios from 'axios'

const UserSelector = ({onSelect}) => {
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState('')

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users')
      setUsers(res.data)
    } catch (err) {
      setUsers([])
    }
  }

  useEffect(()=>{ fetchUsers() }, [])

  const handleSelect = () => {
    const u = users.find(x=>x._id === selected)
    if (u && onSelect) onSelect(u)
  }

  return (
    <div className="d-flex gap-2 align-items-center">
      <select className="form-select" value={selected} onChange={e=>setSelected(e.target.value)}>
        <option value="">-- Selecciona usuario --</option>
        {users.map(u=> <option key={u._id} value={u._id}>{u.name}</option>)}
      </select>
      <button className="btn btn-secondary" type="button" onClick={handleSelect}>Entrar</button>
    </div>
  )
}

export default UserSelector

import React, {useEffect, useState} from 'react'
import { createPortal } from 'react-dom'
import axios from 'axios'

const overlayStyle = {
  position: 'fixed', top:0, left:0, right:0, bottom:0,
  backgroundColor: 'rgba(0,0,0,0.25)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:9999
}

const modalStyle = { background:'#111111', color:'#e6eef8', padding:20, borderRadius:8, maxWidth:800, width:'85%', maxHeight:'90%', overflowY:'auto' }

const StarDisplay = ({ value = 0, outOf = 5 }) => {
  const n = Math.round(Number(value) || 0)
  return (
    <span aria-hidden>
      {Array.from({ length: outOf }).map((_, i) => (
        <span key={i} style={{ color: i < n ? '#f5c518' : '#ddd', fontSize: '1.2rem', marginRight: 4 }}>★</span>
      ))}
    </span>
  )
}

const StarPicker = ({ value = 0, onChange }) => {
  const [hover, setHover] = useState(0)
  return (
    <div>
      {[1,2,3,4,5].map(i => (
        <span key={i}
          onMouseEnter={()=>setHover(i)}
          onMouseLeave={()=>setHover(0)}
          onClick={()=>onChange(i)}
          style={{ cursor: 'pointer', color: i <= (hover || value) ? '#f5c518' : '#ddd', fontSize: '1.6rem', marginRight: 6 }}
          aria-label={`${i} estrellas`}
        >★</span>
      ))}
    </div>
  )
}

const RecipeModal = ({ item, onClose, user }) => {
  const [recipe, setRecipe] = useState(null)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  useEffect(()=>{
    const ensure = async () => {
      try {
        const res = await axios.post('/api/recipes', { title: item.strMeal, description: item.strInstructions ? item.strInstructions.substring(0,200) : '' })
        setRecipe(res.data)
        const rev = await axios.get(`/api/reviews/recipe/${res.data._id}`)
        setReviews(rev.data)
      } catch (err) {
        console.error(err)
      }
    }
    ensure()
  },[item])

  const submitReview = async (e) => {
    e.preventDefault()
    let uid = user && (user._id || user.id) ? (user._id || user.id) : null

    try {
      const stored = JSON.parse(localStorage.getItem('mvp_user'))
      if (stored) {
        if (stored._id || stored.id) uid = uid || (stored._id || stored.id)
        else if (stored.name && !uid) {
          try {
            const all = await axios.get('/api/users')
            const found = (all.data || []).find(u => String(u.name).toLowerCase() === String(stored.name).toLowerCase())
            if (found) uid = found._id
          } catch (err) {
            // ignore
          }
        }
      }
    } catch (err) {
      // ignore parse errors
    }

    if (!uid) return alert('Por favor ingresa en /usuario antes de dejar una review')
    if (!recipe || !recipe._id) return alert('Espera mientras se crea la receta en el servidor')

    try {
      const payload = { userId: uid, recipeId: recipe._id, rating: Number(rating), comment }
      await axios.post('/api/reviews', payload)
      const rev = await axios.get(`/api/reviews/recipe/${recipe._id}`)
      setReviews(rev.data)
      setComment('')
    } catch (err) {
      alert(err.response?.data?.message || 'Error enviando review')
    }
  }

  const avgNum = reviews.length ? (reviews.reduce((a,r)=>a + r.rating, 0) / reviews.length) : 0

  const modal = (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e)=>e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-start">
          <h3>{item.strMeal}</h3>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>Cerrar</button>
        </div>
        <div className="row">
          <div className="col-md-4">
            <img src={item.strMealThumb} alt={item.strMeal} className="img-fluid rounded" />
            <p className="mt-2"><strong>Puntaje promedio:</strong> <StarDisplay value={avgNum} /> <span className="ms-2">{avgNum.toFixed(1)} ({reviews.length})</span></p>
          </div>
          <div className="col-md-8">
            <h5>Descripción</h5>
            <p>{item.strInstructions || 'Sin descripción'}</p>

            <h5>Comentarios</h5>
            {reviews.length === 0 && <p className="text-muted">No hay comentarios aún.</p>}
            <ul className="list-unstyled">
              {reviews.map(r => (
                <li key={r._id} className="mb-2">
                  <strong>{r.user?.name || 'Anon'}:</strong>
                  <span className="ms-2"><StarDisplay value={r.rating} outOf={5} /></span>
                  <span className="ms-2">— {r.comment}</span>
                </li>
              ))}
            </ul>

            <h5>Dejar una review</h5>
            <form onSubmit={submitReview}>
              <div className="mb-2">
                <label className="form-label">Puntaje</label>
                <div>
                  <StarPicker value={rating} onChange={setRating} />
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label">Comentario</label>
                <textarea className="form-control" value={comment} onChange={e=>setComment(e.target.value)} />
              </div>
              <button className="btn btn-success" type="submit" disabled={!user}>Enviar review</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

export default RecipeModal

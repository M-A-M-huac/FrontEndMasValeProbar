import React, {useState} from 'react'
import RecipeModal from './RecipeModal'

const PersonajesItem = ({item, user}) => {
    const [open, setOpen] = useState(false)

    return (
        <div className={"card" + (open ? ' no-flip' : '')} onClick={()=>setOpen(true)} style={{cursor:'pointer'}} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') setOpen(true) }}>
            <div className="card-inner">
                <div className="card-front">
                    <img src={item.strMealThumb} alt={item.strMeal} />
                </div>
                <div className="card-back">
                    <h1>{item.strMeal}</h1>
                    <ul>
                        <li>
                            <strong>Categoría:</strong> {item.strCategory || 'N/A'}
                        </li>
                        <li>
                            <strong>Región:</strong> {item.strArea || 'N/A'}
                        </li>
                        <li>
                            <strong>Instrucciones (resumen):</strong> {item.strInstructions ? item.strInstructions.substring(0,120) + '...' : 'N/A'}
                        </li>
                    </ul>
                                        <div className="mt-2">
                                            <button className="btn btn-sm btn-outline-light me-2" onClick={(e)=>{ e.stopPropagation(); setOpen(true) }}>Ver receta</button>
                                            {item.strSource && <a className="btn btn-sm btn-outline-light" href={item.strSource} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}>Ver receta completa</a>}
                                        </div>

                    {open && <RecipeModal item={item} user={user} onClose={()=>setOpen(false)} />}
                </div>
            </div>
        </div>
    )
}

export default PersonajesItem
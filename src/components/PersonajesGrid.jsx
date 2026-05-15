import React from 'react'
import Spinner from './Spinner'
import PersonajesItem from './PersonajesItem'

const PersonajesGrid = ({ items, isLoading, user }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <section className='cards'>
        {items.map((item)=>(
          <PersonajesItem key={item.idMeal} item={item} user={user} />
        ))}
    </section>
  )
}

export default PersonajesGrid
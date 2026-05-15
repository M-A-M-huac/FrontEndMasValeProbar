import React, {useState} from 'react'

const Contact = () => {
  const [form, setForm] = useState({name:'', email:'', message:''})

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Formulario enviado (simulado). Revisa la consola.');
    console.log('Contacto:', form)
    setForm({name:'', email:'', message:''})
  }

  return (
    <section id="contacto" className="my-4">
      <div className="p-4 bg-secondary text-white rounded">
        <h3>Contacto</h3>
        <p>Formulario estático para envío de información (simulado localmente).</p>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <input name="name" value={form.name} onChange={handleChange} type="text" className="form-control" placeholder="Nombre" required />
          </div>
          <div className="col-md-4">
            <input name="email" value={form.email} onChange={handleChange} type="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="col-md-12">
            <textarea name="message" value={form.message} onChange={handleChange} className="form-control" rows="4" placeholder="Mensaje"></textarea>
          </div>
          <div className="col-12">
            <button className="btn btn-light" type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact

import React from 'react'
import logo from '../assets/Logo.png'

const Header = ({ user, onLogout }) => {
  return (
    <header className="my-3">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src={logo} alt='Logo' style={{width:60, marginRight:10}} />
            <strong>Mas Vale Probar</strong>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link" href="#objetivo">Objetivo</a></li>
              <li className="nav-item"><a className="nav-link" href="#recetas">Recetas</a></li>
              <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
              <li className="nav-item"><a className="nav-link" href="#sobre-nosotros">Sobre nosotros</a></li>
              <li className="nav-item"><a className="nav-link" href="/usuario">Usuario</a></li>
              {user ? (
                <>
                  <li className="nav-item"><span className="nav-link">{user.name}</span></li>
                  <li className="nav-item"><button className="btn btn-sm btn-outline-light" onClick={onLogout}>Logout</button></li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
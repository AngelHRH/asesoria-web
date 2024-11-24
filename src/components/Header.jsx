import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = ({ onLoginOpen, onRegisterOpen, onLogout, isAuthenticated }) => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" className="logo-image" />
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav-links">
          <li>
            <Link to="/home" className="nav-link">Inicio</Link>
          </li>
          <li>
            <Link to="/main" className="nav-link">Explorar</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">Acerca de</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">Contacto</Link>
          </li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {isAuthenticated ? (
          <button onClick={onLogout} className="auth-button logout-button">Cerrar Sesión</button>
        ) : (
          <>
            <button onClick={onLoginOpen} className="auth-button">Login</button>
            <button onClick={onRegisterOpen} className="auth-button">Registro</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

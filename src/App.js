import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginModal from "./components/Login/LoginModal";
import RegisterModal from "./components/Register/RegisterModal";
import Home from "./pages/Home";
import Main from "./pages/Main";
import "./styles/modal.css";

const App = () => {
  const [openModal, setOpenModal] = useState(null); // Controla qué modal está abierto: 'login', 'register', o null.
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Indica si el usuario está autenticado.

  const openLogin = () => setOpenModal("login");
  const openRegister = () => setOpenModal("register");
  const closeModal = () => setOpenModal(null);

  const handleLogin = () => {
    // Simula un inicio de sesión exitoso
    setIsAuthenticated(true);
    closeModal();
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Cierra la sesión
  };

  return (
    <Router>
      <Header
        onLoginOpen={openLogin}
        onRegisterOpen={openRegister}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />
      <div>
        {/* Modales controlados por el estado centralizado */}
        <LoginModal isOpen={openModal === "login"} onClose={closeModal} onLogin={handleLogin} />
        <RegisterModal isOpen={openModal === "register"} onClose={closeModal} />

        {/* Rutas */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); // Limpia la sesión
    navigate("/login");    // Redirige al login
  };

  return <button onClick={handleLogout}>Cerrar Sesión</button>;
};

export default Logout;

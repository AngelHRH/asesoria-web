import React, { useState } from "react";

const RegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    tipo_usuario: "alumno", // por defecto
    asignatura: "",
    foto_perfil: null,
  });

  const [mensaje, setMensaje] = useState(null);

  const asignaturasDisponibles = [
    "Matemáticas",
    "Física",
    "Química",
    "Programación",
    "Diseño Gráfico",
    "Marketing",
    "Idiomas",
    "Historia",
    "Biología",
  ];

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost/backend/registro.php", {
        method: "POST",
        body: formDataObj,
      });
      const data = await response.json();
      if (data.success) {
        setMensaje("Usuario registrado correctamente.");
        setFormData({
          nombre: "",
          correo: "",
          contraseña: "",
          tipo_usuario: "alumno",
          asignatura: "",
          foto_perfil: null,
        });
      } else {
        setMensaje(data.error || "Ocurrió un error.");
      }
    } catch (error) {
      setMensaje("Error al conectarse con el servidor.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Registro</h2>
        {mensaje && <p>{mensaje}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />

          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />

          <label htmlFor="tipo_usuario">Tipo de usuario</label>
          <select
            id="tipo_usuario"
            name="tipo_usuario"
            value={formData.tipo_usuario}
            onChange={handleChange}
          >
            <option value="alumno">Alumno</option>
            <option value="tutor">Tutor</option>
          </select>

          {formData.tipo_usuario === "tutor" && (
            <>
              <label htmlFor="asignatura">Asignatura</label>
              <select
                id="asignatura"
                name="asignatura"
                value={formData.asignatura}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecciona una asignatura
                </option>
                {asignaturasDisponibles.map((asignatura) => (
                  <option key={asignatura} value={asignatura}>
                    {asignatura}
                  </option>
                ))}
              </select>
            </>
          )}

          <label htmlFor="foto_perfil">Foto de perfil</label>
          <input
            type="file"
            id="foto_perfil"
            name="foto_perfil"
            onChange={handleChange}
          />

          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;

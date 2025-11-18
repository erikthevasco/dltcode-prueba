"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPopup(null);

    /*comprueba si existen las creedenciales y manda mensaje */
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setPopup({ message: `¡Bienvenido ${data.name}!`, type: "success" });
        setEmail("");
        setPassword("");
      } else {
        setPopup({ message: data.error || "Correo o contraseña incorrectos", type: "error" });
      }
    } catch (err) {
      setPopup({ message: "Error de conexión con el servidor", type: "error" });
    }

    /*oculta el pop up a los 3 segundos*/
    setTimeout(() => setPopup(null), 3000);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src="/login.png" alt="Login" />
      </div>
      <div className="login-right">
        <div className="login-right-content">
          <h1>INICIA SESIÓN</h1>
          <p>Para acceder a la colección de criaturas mágicas. Solo maestros y cuidadores reconocidos pueden entrar</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" placeholder="tunombre@santuario.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" placeholder="Introduce tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit">Iniciar sesión</button>

            <a className="login-right-cuenta" href="/auth/register">
              ¿No tienes cuenta? Regístrate en el santuario
            </a>
          </form>
        </div>
      </div>

      {/* diseño del popup */}
      {popup && (
        <div className={`popup ${popup.type}`}>
          {popup.message}
        </div>
      )}

      <style jsx>{`
        .popup {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 25px;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          z-index: 1000;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          animation: fadein 0.3s, fadeout 0.3s 2.7s;
        }
        .popup.success { background-color: #4caf50; }
        .popup.error { background-color: #f44336; }

        @keyframes fadein { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeout { from { opacity: 1; } to { opacity: 0; transform: translateY(-10px); } }
      `}</style>
    </div>
  );
}

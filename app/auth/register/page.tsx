"use client";

import { useState } from "react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("cuidador");
    const [password, setPassword] = useState("");
    const [popup, setPopup] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPopup(null);

        /*comprueba si está todo guay y manda mensaje */
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await res.json();

            if (res.ok) {
                setPopup({ message: "Usuario registrado correctamente", type: "success" });
                setName("");
                setEmail("");
                setPassword("");
                setRole("cuidador");
            } else {
                setPopup({ message: data.error || "Error desconocido", type: "error" });
            }
        } catch (err) {
            setPopup({ message: "Error de conexión con el servidor", type: "error" });
        }

        /*oculta el pop-up después de 3 segundos*/
        setTimeout(() => setPopup(null), 3000);
    };

    return (
        <div className="register-page">
            <div className="register-left">
                <img src="/register.png" alt="Registro" />
            </div>
            <div className="register-right">
                <div className="register-right-content">
                    <h1>Únete al santuario</h1>
                    <p>Elige si serás un cuidador o maestro de criaturas. Completa los detalles para comenzar</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre mágico</label>
                            <input type="text" id="name" placeholder="Introduce tu nombre mágico" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo mágico</label>
                            <input type="email" id="email" placeholder="tunombre@bestiario.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rol">Rol</label>
                            <select id="rol" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="cuidador">Cuidador</option>
                                <option value="maestro">Maestro</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Palabra mágica</label>
                            <input type="password" id="password" placeholder="Introduce tu palabra mágica" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <button type="submit">Registrarme en el santuario</button>

                        <a className="register-right-cuenta" href="/auth/login">
                            ¿Tienes cuenta? Inicia sesión en el refugio
                        </a>
                    </form>
                </div>
            </div>

            {/* Pop-up */}
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

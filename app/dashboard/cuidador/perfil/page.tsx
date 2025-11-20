"use client";

import { useState, useEffect } from "react";

interface User {
    name: string;
    email: string;
    role: string;
}

export default function CaretakerPerfilPage() {

    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        role: "",
    });

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/user?userId=1");
            const data = await res.json();
            setUser(data.user);
        }
        fetchUser();
    }, []);

    return (
        <div className="caretaker-page">
            <div className="caretaker-left">
                <img src="/caretaker.png" alt="Caretaker" />
            </div>

            <div className="caretaker-right">

                <header className="caretaker-header">
                    <h1>EL SANTUARIO</h1>
                    <a href="/dashboard/cuidador">Mis criaturas</a>
                    <a href="/dashboard/caretaker/perfil">Mi perfil</a>
                    <a href="/auth/login">Cerrar sesión</a>
                </header>

                <div className="caretaker-right-content">
                    <h2>MI PERFIL</h2>
                    <p>Este es el lugar donde podrás gestionar, actualizar y personalizar la información de tu perfil.</p>
                </div>

                <div className="caretaker-profile-content">
                    <label>Nombre mágico</label>
                    <input type="text" value={user.name} readOnly />

                    <label>Correo mágico</label>
                    <input type="text" value={user.email} readOnly />

                    <label>Rol</label>
                    <input type="text" value={user.role} readOnly />

                    <label>Descripción</label>
                    <input type="text"/>
                </div>

            </div>
        </div>
    );
};


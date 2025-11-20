"use client";

import { useState, useEffect } from "react";

interface Creature {
    id: number;
    name: string;
    type: string;
    power: number;
    trained: string;
}

export default function MasterPerfilPage() {
    return (
        <div className="master-page">
            <div className="master-left">
                <img src="/master.png" alt="Master" />
            </div>

            <div className="master-right">

                <header className="master-header">
                    <h1>EL SANTUARIO</h1>
                    <a href="/dashboard/maestro">Mis criaturas</a>
                    <a href="/dashboard/maestro/perfil">Mi perfil</a>
                    <a href="/auth/login">Cerrar sesión</a>
                </header>

                <div className="master-right-content">
                    <h2>MI PERFIL</h2>
                    <p>Este es el lugar donde podrás gestionar, actualizar y personalizar la información de tu perfil.</p>
                </div>
            </div>
        </div>
    );
};


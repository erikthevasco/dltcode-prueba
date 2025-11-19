"use client";

import { useState } from "react";

export default function MasterPage() {

    /*esto es indicar si el usuario le ha dado el boton de crear criatura para enseñar el formulario*/
    const [isCreating, setIsCreating] = useState(false);
    const [popup, setPopup] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [power, setPower] = useState("");
    const [trained, setTrained] = useState("");


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPopup(null);

        /* validaciones */
        if (!name.trim()) {
            setPopup({ message: "Debes indicar el nombre de la criatura.", type: "error" });
            setTimeout(() => setPopup(null), 3000);

            return;
        }
        if (!type) {
            setPopup({ message: "Debes seleccionar un tipo de criatura.", type: "error" });
            setTimeout(() => setPopup(null), 3000);

            return;
        }
        if (!power || Number(power) < 0 || Number(power) > 99) {
            setPopup({ message: "El nivel de poder debe estar entre 0 y 99.", type: "error" });
            setTimeout(() => setPopup(null), 3000);

            return;
        }
        if (!trained) {
            setPopup({ message: "Debes indicar si la criatura está entrenada o no.", type: "error" });
            setTimeout(() => setPopup(null), 3000);

            return;
        }

        setPopup({ message: "Criatura registrada correctamente", type: "success" });


        /* resetear formulario */
        setName("");
        setType("");
        setPower("");
        setTrained("");
        setIsCreating(false);

        /* el popup desaparece a los 3 segundos*/
        setTimeout(() => setPopup(null), 3000);
    };

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
                    <h2>MIS CRIATURAS</h2>
                    <p>Explora y gestiona todas las criaturas mágicas que has recolectado.</p>

                    {!isCreating && (
                        <div className="master-empty-state">
                            <p className="master-empty-text">
                                Aún no has añadido ninguna criatura al santuario ¡Empieza tu colección ahora!
                            </p>
                            <button className="master-empty-button" onClick={() => setIsCreating(true)}>
                                Añadir nueva criatura
                            </button>
                        </div>
                    )}
                    {/* al entrar y no tener criaturas sale el mensaje y boton, al hacerle click se cambia el estado
                     y esconde el mensaje y botón y enseña el formulario */}
                    {isCreating && (
                        <form className="master-creature-form" onSubmit={handleSubmit}>
                            <h1>Creador de criaturas mágicas</h1>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="creatureName">Nombre mágico de la criatura</label>
                                    <input
                                        type="text"
                                        id="creatureName"
                                        placeholder="Introduce el nombre de la criatura"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="creatureType">Tipo de criatura</label>
                                    <select
                                        id="creatureType"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="">--Selecciona--</option>
                                        <option value="dragon">Dragón</option>
                                        <option value="fenix">Fénix</option>
                                        <option value="golem">Golem</option>
                                        <option value="vampiro">Vampiro</option>
                                        <option value="unicornio">Unicornio</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="creaturePower">Nivel de poder</label>
                                    <input
                                        type="number"
                                        id="creaturePower"
                                        min="0"
                                        max="99"
                                        placeholder="1"
                                        value={power}
                                        onChange={(e) => setPower(e.target.value)}
                                    />
                                </div>

                                <div className="form-group-trained">
                                    <label className="trained-question">¿Entrenada?</label>
                                    <div className="trained-options">
                                        <label className="trained-option">
                                            <input
                                                type="radio"
                                                name="creatureTrained"
                                                value="si"
                                                checked={trained === "si"}
                                                onChange={(e) => setTrained(e.target.value)}
                                            />
                                            Sí
                                        </label>
                                        <label className="trained-option">
                                            <input
                                                type="radio"
                                                name="creatureTrained"
                                                value="no"
                                                checked={trained === "no"}
                                                onChange={(e) => setTrained(e.target.value)}
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button type="submit">Registrar criatura</button>
                        </form>
                    )}
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
                    left: 55%;
                    transform: translateX(-50%);
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

                @keyframes fadein {
                    from { opacity: 0; transform: translate(-50%, -10px); }
                    to { opacity: 1; transform: translate(-50%, 0); }
                }

                @keyframes fadeout {
                    from { opacity: 1; }
                    to { opacity: 0; transform: translate(-50%, -10px); }
                }
            `}</style>
        </div>
    );
}
"use client";

import { Html } from "next/document";
import { useState } from "react";

export default function MasterPage() {

    /*esto es indicar si el usuario le ha dado el boton de crear criatura para enseñar el formulario*/
    const [isCreating, setIsCreating] = useState(false);
    return (
        <div className="master-page">
            <div className="master-left">
                <img src="/master.png" alt="Master"></img>
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
                    <p>Explora y gestiona todas las criaturas mágicas que has recolectado. Cada una tiene habilidades únicas y características especiales.</p>
                    
                    {!isCreating && ( /*si no tiene criaturas sale esta interfaz, en caso de darle al botón, se esconde y sale el formulario*/
                        <div className="master-empty-state">
                            <p className="master-empty-text">Aún no has añadido ninguna criatura al santuario ¡Empieza tu colección ahora!</p>
                            <button className="master-empty-button" onClick={() => setIsCreating(true)}>Añadir nueva criatura</button>
                        </div>
                    )}
                    {isCreating && (
                        <form className="master-creature-form">
                            <h1>Creador de criaturas mágicas</h1>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="creatureName">Nombre mágico de la criatura</label>
                                    <input type="text" id="creatureName" placeholder="Introduce el nombre de la criatura"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="creatureType">Tipo de criatura</label>
                                    <select id="creatureType">
                                        <option value="dragon">Dragón</option>
                                        <option value="fenix">Fénix</option>
                                        <option value="golem">Golem</option>
                                        <option value="vampiro">Vampiro</option>
                                        <option value="unicornio">Unicornio</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="creaturePower">Nivel de poder</label>
                                    <input type="number" id="creaturePower" min="0" max="99" placeholder="1"></input>
                                </div> 
                                {/* al ser diferente a los otros y tener que editar más cosas de estilo, se estructura de diferente manera */}
                                <div className="form-group-trained">  
                                    <label className="trained-question" htmlFor="creatureTrained">¿Entrenada?</label>
                                    <div className="trained-options">
                                        <label className="trained-option" htmlFor="trainedYes">
                                            <input type="radio" id="trainedYes" name="creatureTrained" value="si" />
                                            Sí
                                        </label>
                                        <label className="trained-option" htmlFor="trainedNo">
                                            <input type="radio" id="trainedNo" name="creatureTrained" value="no" />
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
        </div>
    );
}
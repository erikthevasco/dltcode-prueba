"use client";

import { useState, useEffect } from "react";

interface Creature {
    id: number;
    name: string;
    type: string;
    power: number;
    trained: string;
}

export default function MasterPage() {

    /*variable para cambiar entre interfaces*/
    const [isCreating, setIsCreating] = useState(false);

    /*variables de datos para la bd*/
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [power, setPower] = useState("");
    const [trained, setTrained] = useState("");

    const [creatures, setCreatures] = useState<Creature[]>([]);

    /*variables para el filtrado de la tabla */
    const [search, setSearch] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [appliedTypes, setAppliedTypes] = useState<string[]>([]);

    /*variables para btn editar*/
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState({
        name: "",
        type: "",
        power: "",
        trained: ""
    });

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedTypes((prev) =>
            prev.includes(value)
                ? prev.filter((t) => t !== value)
                : [...prev, value]
        );
    };

    const applyFilter = (e: any) => {
        e.preventDefault();
        setAppliedTypes(selectedTypes);
    };

    // CARGAR CRIATURAS DEL USUARIO
    useEffect(() => {
        fetch("/api/creatures?userId=1")
            .then((res) => res.json())
            .then((data) => {
                if (data.creatures) setCreatures(data.creatures);
            });
    }, []);


    // SUBMIT DEL FORM
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await fetch("/api/creatures", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 1,
                name,
                type,
                power: Number(power),
                trained,
            }),
        });

        const data = await res.json();

        // añadir criatura en pantalla instantáneamente
        setCreatures((prev) => [
            {
                id: data.id ?? Date.now(),
                name,
                type,
                power: Number(power),
                trained,
            },
            ...prev,
        ]);

        setIsCreating(false);
        setName("");
        setType("");
        setPower("");
        setTrained("");
    };


    /*filtro buscar*/
    const filtered = creatures.filter((c) => {
        const matchesName = c.name.toLowerCase().includes(search.toLowerCase());
        const matchesType =
            appliedTypes.length === 0 || appliedTypes.includes(c.type);
        return matchesName && matchesType;
    });

    /*funcion editar*/
    const startEditing = (c: Creature) => {
        setEditingId(c.id);
        setEditValues({
            name: c.name,
            type: c.type,
            power: String(c.power),
            trained: c.trained
        });
    };

    /*funcion guardar editar al darle a enter*/
    const saveEdit = async (e: React.KeyboardEvent<any>) => {
        if (e.key === "Enter" && editingId !== null) {
            const updatedCreature = {
                id: editingId,
                ...editValues,
                power: Number(editValues.power)
            };

            await fetch("/api/creatures", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCreature),
            });

            setCreatures((prev) =>
                prev.map((c) =>
                    c.id === editingId ? { ...c, ...updatedCreature } : c
                )
            );

            setEditingId(null);
        }
    };

    /*funcion borrar linea */
    const deleteCreature = async (id: number) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar esta criatura?");
    if (!confirmDelete) return;

    await fetch(`/api/creatures?id=${id}`, {
        method: "DELETE",
    });

    setCreatures((prev) => prev.filter((c) => c.id !== id));
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
                    <p>Explora y gestiona todas las criaturas que has recolectado. Cada una tiene habilidades únicas y características especiales.</p>


                    {/* si no tiene criaturas muestra esta interfaz */}
                    {creatures.length === 0 && !isCreating && (
                        <div className="master-empty-state">
                            <p className="master-empty-text">
                                Aún no has añadido ninguna criatura.
                            </p>

                            <button onClick={() => setIsCreating(true)}>
                                Añadir nueva criatura
                            </button>
                        </div>
                    )}

                    {/* al darle al boton enseña el formulario y esconde el boton y el mensaje anterior*/}
                    {isCreating && (
                        <form className="master-creature-form" onSubmit={handleSubmit}>
                            <h1>Creador de criaturas mágicas</h1>

                            <div className="form-grid">

                                <div className="form-group">
                                    <label>Nombre mágico</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Tipo</label>
                                    <select value={type} onChange={(e) => setType(e.target.value)}>
                                        <option value="">Fénix</option>
                                        <option value="dragon">Dragón</option>
                                        <option value="fenix">Fénix</option>
                                        <option value="golem">Gólem</option>
                                        <option value="vampiro">Vampiro</option>
                                        <option value="unicornio">Unicornio</option>

                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Poder</label>
                                    <input
                                        type="number"
                                        value={power}
                                        onChange={(e) => setPower(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="trained-question">¿Entrenada?</label>
                                    <div className="trained-options">
                                        <label>
                                            <input
                                                type="radio"
                                                value="si"
                                                checked={trained === "si"}
                                                onChange={(e) => setTrained(e.target.value)}
                                            /> Sí
                                        </label>

                                        <label>
                                            <input
                                                type="radio"
                                                value="no"
                                                checked={trained === "no"}
                                                onChange={(e) => setTrained(e.target.value)}
                                            /> No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit">Registrar criatura</button>
                        </form>
                    )}

                    {/*si el usuario tiene criaturas muestra esta interfaz*/}
                    {creatures.length > 0 && !isCreating && (
                        <form className="master-creature-table" onSubmit={applyFilter}>
                            <div className="creatures-add-btn">
                                <button type="button" onClick={() => setIsCreating(true)}>Añadir nueva criatura</button>
                            </div>

                            <div className="table-grid">
                                <div className="form_group">
                                    <h2>Filtrar</h2>
                                    <h3>Buscar por tipo</h3>
                                    <div className="filter-options">
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="dragon"
                                                onChange={handleTypeChange}
                                            ></input>Dragón
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="fenix"
                                                onChange={handleTypeChange}
                                            ></input>Fénix
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="golem"
                                                onChange={handleTypeChange}
                                            ></input>Golem
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="grifo"
                                                onChange={handleTypeChange}
                                            ></input>Grifo
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="vampiro"
                                                onChange={handleTypeChange}
                                            ></input>Vampiro
                                        </label>
                                        <button type="submit">Confirmar</button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="table-input-name">
                                        <label>Palabra mágica</label>
                                        <input
                                            type="text"
                                            placeholder="Nombre"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        ></input>
                                    </div>
                                    <table className="creatures-table">
                                        <thead>
                                            <tr className="table-header">
                                                <th>Nombre</th>
                                                <th>Tipo</th>
                                                <th>Nivel</th>
                                                <th>Entrenado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.map((c) => (
                                                <tr key={c.id}>
                                                    <td>
                                                        {editingId === c.id ? (
                                                            <input
                                                                value={editValues.name}
                                                                onChange={(e) =>
                                                                    setEditValues({ ...editValues, name: e.target.value })
                                                                }
                                                                onKeyDown={saveEdit}
                                                                autoFocus
                                                            />
                                                        ) : (
                                                            c.name
                                                        )}
                                                    </td>

                                                    <td>
                                                        {editingId === c.id ? (
                                                            <select
                                                                value={editValues.type}
                                                                onChange={(e) =>
                                                                    setEditValues({ ...editValues, type: e.target.value })
                                                                }
                                                                onKeyDown={saveEdit}
                                                            >
                                                                <option value="dragon">dragón</option>
                                                                <option value="fenix">fénix</option>
                                                                <option value="golem">gólem</option>
                                                                <option value="grifo">grifo</option>
                                                                <option value="vampiro">vampiro</option>
                                                            </select>
                                                        ) : (
                                                            c.type
                                                        )}
                                                    </td>

                                                    <td>
                                                        {editingId === c.id ? (
                                                            <input
                                                                type="number"
                                                                value={editValues.power}
                                                                onChange={(e) =>
                                                                    setEditValues({ ...editValues, power: e.target.value })
                                                                }
                                                                onKeyDown={saveEdit}
                                                            />
                                                        ) : (
                                                            c.power
                                                        )}
                                                    </td>

                                                    <td>
                                                        {editingId === c.id ? (
                                                            <select
                                                                value={editValues.trained}
                                                                onChange={(e) =>
                                                                    setEditValues({ ...editValues, trained: e.target.value })
                                                                }
                                                                onKeyDown={saveEdit}
                                                            >
                                                                <option value="si">Sí</option>
                                                                <option value="no">No</option>
                                                            </select>
                                                        ) : (
                                                            c.trained === "si" ? "Sí" : "No"
                                                        )}
                                                    </td>

                                                    <td>
                                                        <button
                                                            className="edit-btn"
                                                            type="button"
                                                            onClick={() => startEditing(c)}
                                                        >
                                                            ✏️
                                                        </button>
                                                        <button
                                                            className="delete-btn"
                                                            type="button"
                                                            onClick={() => deleteCreature(c.id)}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

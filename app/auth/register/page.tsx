"use client";

export default function RegisterPage() {
    return (
        <div className="register-page">
            <div className="register-left">
                <img src="/register.png"></img>
            </div>
            <div className="register-right">
                <div className="register-right-content">
                    <h1>Únete al santuario</h1>
                    <p>Elige si serás un cuidador o maestro de criaturas. Completa los detalles para comenzar</p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nombre mágico</label>
                            <input type="name" id="name" placeholder="Introduce tu nombre mágico" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo mágico</label>
                            <input type="email" id="email" placeholder="tunombre@bestiario.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rol">Rol</label>
                            <select id="rol">
                                <option value="cuidador">Cuidador</option>
                                <option value="maestro">Maestro</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Palabra mágica</label>
                            <input type="password" id="password" placeholder="Introduce tu palabra mágica" />
                        </div>

                        <button type="submit">Registrarme en el santuario</button>

                        <a className="register-right-cuenta" href="/auth/login">¿Tienes cuenta? Inicia sesión en el refugio</a>
                    </form>

                </div>
            </div>
        </div>

    );
}
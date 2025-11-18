"use client";

export default function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-left">
                <img src="/login.png"></img>
            </div>
            <div className="login-right">
                <div className="login-right-content">
                    <h1>INICIA SESIÓN</h1>
                    <p>Para acceder a la colección de criaturas mágicas. Sólo los maestros y los cuidadores reconocidos pueden entrar </p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Correo mágico</label>
                            <input type="email" id="email" placeholder="tunombre@santuario.com" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Palabra mágica</label>
                            <input type="password" id="password" placeholder="Introduce tu contraseña" />
                        </div>

                        <button type="submit">Acceder al santuario</button>

                        <a className="login-right-cuenta" href="/auth/register">¿No tienes cuenta? Regístrate como maestro o cuidador</a>
                    </form>

                </div>
            </div>
        </div>

    );
}
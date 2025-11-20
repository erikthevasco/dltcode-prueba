import mysql from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    /*estas creedenciales tienen que coincidir con lo que sale en docker-compose.yml*/
    const connection = await mysql.createConnection({
      host: "127.0.0.1",  /*se podria cambiar por localhost*/
      user: "root",
      password: "root",
      database: "dltcode_db",
    });

    const [rows] = await connection.execute(
      "SELECT * FROM User WHERE email = ? AND password = ?",
      [email, password]
    );

    await connection.end();

    /*al iniciar sesión, si es correcto, redirige a una página u otra dependiendo del rol*/
    if ((rows as any).length > 0) {
      const user = (rows as any)[0];
      return new Response(
        JSON.stringify({ success: true, name: user.name, rol: user.rol }),
        { status: 200 }
      );
    }

  } catch (err: any) {
    console.error("Error MySQL:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

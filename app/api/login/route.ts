import mysql from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "root",
      database: "dltcode_db",
    });

    const [rows] = await connection.execute(
      "SELECT * FROM User WHERE email = ? AND password = ?",
      [email, password]
    );

    await connection.end();

    if ((rows as any).length > 0) {
      return new Response(JSON.stringify({ success: true, name: (rows as any)[0].name }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Correo o contraseña incorrectos" }), { status: 401 });
    }
  } catch (err: any) {
    console.error("Error MySQL:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

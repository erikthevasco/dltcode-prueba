import mysql from "mysql2/promise";

export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json();

        /*estas creedenciales tienen que coincidir con lo que sale en docker-compose.yml*/
        const connection = await mysql.createConnection({
            host: "127.0.0.1",    /*se podria cambiar por localhost*/   
            user: "root",             
            password: "root",        
            database: "dltcode_db"  
        });

        const [result] = await connection.execute(
            "INSERT INTO User (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, password, role]
        );

        await connection.end();

        return new Response(JSON.stringify({ success: true, result }), { status: 200 });
    } catch (err: any) {
        console.error("Error MySQL:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

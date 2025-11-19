import { NextRequest, NextResponse } from "next/server";
import db from "../../lib/db";

export async function POST(req: NextRequest) {
try {
const body = await req.json();
const { name, type, power, trained, userId } = body;

    // Validaciones básicas
    if (!name || !type || !power || !trained || !userId) {
        return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const query = `
        INSERT INTO Creatures (name, type, power, trained, user_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(query, [name, type, Number(power), trained, userId]);

    return NextResponse.json({ message: "Criatura registrada correctamente" }, { status: 201 });
} catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al registrar la criatura" }, { status: 500 });
}


}

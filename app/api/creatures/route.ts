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
export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Falta userId" }, { status: 400 });
        }

        const query = `
      SELECT id, name, type, power, trained
      FROM Creatures
      WHERE user_id = ?
      ORDER BY id DESC
    `;

        const [rows] = await db.execute(query, [userId]);

        return NextResponse.json({ creatures: rows }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Error al obtener criaturas" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, name, type, power, trained } = body;

        if (!id || !name || !type || !power || !trained) {
            return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
        }

        const query = `
            UPDATE Creatures
            SET name = ?, type = ?, power = ?, trained = ?
            WHERE id = ?
        `;

        await db.execute(query, [name, type, Number(power), trained, id]);

        return NextResponse.json({ message: "Criatura actualizada correctamente" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error al actualizar la criatura" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Falta el id de la criatura" }, { status: 400 });
        }

        const query = `DELETE FROM Creatures WHERE id = ?`;
        await db.execute(query, [id]);

        return NextResponse.json({ message: "Criatura eliminada correctamente" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error al eliminar la criatura" }, { status: 500 });
    }
}



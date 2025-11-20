import { NextRequest, NextResponse } from "next/server";
import db from "../../lib/db";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        if (!userId) {
            return NextResponse.json({ error: "Falta userId" }, { status: 400 });
        }

        const query = `
            SELECT name, email, role
            FROM User
            WHERE id = ?
        `;
        const [rows] = await db.execute(query, [userId]);

        if (Array.isArray(rows) && rows.length > 0) {
            return NextResponse.json({ user: rows[0] });
        } else {
            return NextResponse.json({ user: null });
        }

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 });
    }
}

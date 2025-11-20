import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, password, rol } = await req.json();

  if (!email || !password || !name)
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists)
    return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });

  const hashed = await hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      rol,
    },
  });

  return NextResponse.json({ message: "Usuario creado" });
}

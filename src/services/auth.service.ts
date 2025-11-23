import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (data: any) => {
  const exist = await prisma.user.findUnique({ where: { email: data.email } });
  if (exist) throw new Error("Email already used");

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: { email: data.email, password: hashed, name: data.name || null },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!
  );

  return { user, token };
};

export const login = async (data: any) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!
  );

  return { user, token };
};

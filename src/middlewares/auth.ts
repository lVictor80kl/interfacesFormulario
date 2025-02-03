import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer <token>"

  if (!token) {
    res.status(401).json({ error: "Token no proporcionado" });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ error: "Token inválido o expirado" });
      return;
    }

    // Adjuntar el ID del usuario a la solicitud
    (req as any).userId = user.id; // Usamos "as any" para evitar problemas de tipo
    next();
  });
};
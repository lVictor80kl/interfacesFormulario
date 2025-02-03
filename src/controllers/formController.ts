import { Request, Response } from "express";
import prisma from "../models/user";

export const createForm = async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    lastname,
    CI,
    phone,
    email,
    country,
    city,
    state,
    laboralExperiences,
    languages,
    academyFormations,
    skills,
    softSkills,
    userId,
  } = req.body;

  try {
    // Validación de campos obligatorios
    if (
      !name ||
      !lastname ||
      !CI ||
      !phone ||
      !email ||
      !country ||
      !city ||
      !state ||
      !laboralExperiences ||
      !languages ||
      !academyFormations ||
      !skills ||
      !softSkills ||
      !userId
    ) {
      res.status(400).json({ message: "Todos los campos son obligatorios" });
      return;
    }

    // Verificar si el usuario existe
    const user = await prisma.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    // Crear el formulario asociado al usuario
  const form = await prisma.form.create({ 
  data: { 
    name, 
    lastname, 
    CI, 
    phone, 
    email, 
    country, 
    city, 
    state, 
    laboralExperiences, 
    languages, 
    academyFormations, 
    skills, 
    softSkills, 
    userId 
  } 
});

    // Enviar respuesta exitosa
    res.status(201).json({ message: "Formulario creado", form });
  } catch (error) {
    console.error("Error al crear el formulario:", error);
    res.status(500).json({ error: "Hubo un error al crear el formulario" });
  }
};
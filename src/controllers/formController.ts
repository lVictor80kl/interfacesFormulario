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
  } = req.body;

  const userId = (req as any).userId; // Obtenemos el ID del usuario del middleware

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
      !softSkills
    ) {
      res.status(400).json({ message: "Todos los campos son obligatorios" });
      return;
    }

    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({
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
        userId,
      },
    });

    // Enviar respuesta exitosa
    res.status(201).json({ message: "Formulario creado", form });
  } catch (error) {
    console.error("Error al crear el formulario:", error);
    res.status(500).json({ error: "Hubo un error al crear el formulario" });
  }
};

export const updateForm = async (req: Request, res: Response): Promise<void> => {
  const formId = parseInt(req.params.id); // Obtén el ID del formulario de los parámetros de la ruta
  const userId = (req as any).userId; // Obtén el userId del token

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
  } = req.body;

  try {
    // Verifica si el formulario existe y pertenece al usuario
    const existingForm = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!existingForm) {
      res.status(404).json({ message: "Formulario no encontrado" });
      return;
    }

    if (existingForm.userId !== userId) {
      res.status(403).json({ message: "No tienes permiso para actualizar este formulario" });
      return;
    }

    // Actualiza solo los campos proporcionados en el cuerpo de la solicitud
    const updatedForm = await prisma.form.update({
      where: { id: formId },
      data: {
        name: name !== undefined ? name : existingForm.name,
        lastname: lastname !== undefined ? lastname : existingForm.lastname,
        CI: CI !== undefined ? CI : existingForm.CI,
        phone: phone !== undefined ? phone : existingForm.phone,
        email: email !== undefined ? email : existingForm.email,
        country: country !== undefined ? country : existingForm.country,
        city: city !== undefined ? city : existingForm.city,
        state: state !== undefined ? state : existingForm.state,
        laboralExperiences:
          laboralExperiences !== undefined ? laboralExperiences : existingForm.laboralExperiences,
        languages: languages !== undefined ? languages : existingForm.languages,
        academyFormations:
          academyFormations !== undefined ? academyFormations : existingForm.academyFormations,
        skills: skills !== undefined ? skills : existingForm.skills,
        softSkills: softSkills !== undefined ? softSkills : existingForm.softSkills,
      },
    });

    // Envía la respuesta con el formulario actualizado
    res.status(200).json({ message: "Formulario actualizado", form: updatedForm });
  } catch (error) {
    console.error("Error al actualizar el formulario:", error);
    res.status(500).json({ error: "Hubo un error al actualizar el formulario" });
  }
};

export const getForm = async (req: Request, res: Response): Promise<void> => {
  const formId = parseInt(req.params.id); // Obtén el ID del formulario de los parámetros de la ruta

  try {
    // Verifica si el formulario existe
    const existingForm = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!existingForm) {
      res.status(404).json({ message: "Formulario no encontrado" });
      return;
    }

    // Envía la respuesta con el formulario
    res.status(200).json({ message: "Formulario obtenido", form: existingForm });
  } catch (error) {
    console.error("Error al obtener el formulario:", error);
    res.status(500).json({ error: "Hubo un error al obtener el formulario" });
  }
  
};
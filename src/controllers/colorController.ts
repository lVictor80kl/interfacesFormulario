import { Request, Response } from "express";
import prisma from "../models/user"; // Asegúrate de importar tu instancia de Prisma
import multer from "multer"; // Para manejar la carga de archivos
import path from "path";

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  },
});

const upload = multer({ storage: storage });

// Crear una nueva paleta
export const createPallette = async (req: Request, res: Response): Promise<void> => {
  const { name, colors, sizes, typo1, typo2, userId } = req.body;
  const numberId = parseInt(userId)

  try {
    // Validación de campos obligatorios
    const missingFields: string[] = [];

    if (!name) missingFields.push("name");
    if (!colors) missingFields.push("colors");
    if (!sizes) missingFields.push("sizes");
    if (!typo1) missingFields.push("typo1");
    if (!typo2) missingFields.push("typo2");
    if (!req.files || !(req.files as any).typo1File) missingFields.push("typo1File");
    if (!req.files || !(req.files as any).typo2File) missingFields.push("typo2File");

    if (missingFields.length > 0) {
      res.status(400).json({
        message: "Faltan los siguientes campos obligatorios",
        missingFields,
      });
      return;
    }

    // Crear la paleta asociada al usuario
    const pallette = await prisma.pallette.create({
      data: {
        name,
        colors,
        sizes,
        typo1,
        typo2,
        typo1File: (req.files as any).typo1File[0].path, // Ruta del archivo subido
        typo2File: (req.files as any).typo2File[0].path, // Ruta del archivo subido
        userId: numberId,
      },
    });

    // Enviar respuesta exitosa
    res.status(201).json({ message: "Paleta creada", pallette });
  } catch (error) {
    console.error("Error al crear la paleta:", error);
    res.status(500).json({ error: "Hubo un error al crear la paleta" });
  }
};

// Actualizar una paleta existente
export const updatePallette = async (req: Request, res: Response): Promise<void> => {
  const palletteId = parseInt(req.params.id); // Obtener el ID de la paleta de los parámetros de la ruta
  const userId = (req as any).userId; // Obtener el userId del token

  const { name, colors, typo1, typo2, sizes } = req.body;

  try {
    // Verificar si la paleta existe y pertenece al usuario
    const existingPallette = await prisma.pallette.findUnique({
      where: { id: palletteId },
    });

    if (!existingPallette) {
      res.status(404).json({ message: "Paleta no encontrada" });
      return;
    }

    if (existingPallette.userId !== userId) {
      res.status(403).json({ message: "No tienes permiso para actualizar esta paleta" });
      return;
    }

    // Actualizar solo los campos proporcionados en el cuerpo de la solicitud
    const updatedPallette = await prisma.pallette.update({
      where: { id: palletteId },
      data: {
        name: name !== undefined ? name : existingPallette.name,
        colors: colors !== undefined ? colors : existingPallette.colors,
        typo1: typo1 !== undefined ? typo1 : existingPallette.typo1,
        typo2: typo2 !== undefined ? typo2 : existingPallette.typo2,
        sizes: sizes !== undefined ? sizes : existingPallette.sizes,
        typo1File: req.files ? (req.files as any).typo1File[0].path : existingPallette.typo1File,
        typo2File: req.files ? (req.files as any).typo2File[0].path : existingPallette.typo2File,
      },
    });

    // Enviar respuesta con la paleta actualizada
    res.status(200).json({ message: "Paleta actualizada", pallette: updatedPallette });
  } catch (error) {
    console.error("Error al actualizar la paleta:", error);
    res.status(500).json({ error: "Hubo un error al actualizar la paleta" });
  }
};

// Obtener una paleta existente
export const getPallette = async (req: Request, res: Response): Promise<void> => {
  const palletteId = parseInt(req.params.id); // Obtener el ID de la paleta de los parámetros de la ruta

  try {
    // Verificar si la paleta existe
    const existingPallette = await prisma.pallette.findUnique({
      where: { id: palletteId },
    });

    if (!existingPallette) {
      res.status(404).json({ message: "Paleta no encontrada" });
      return;
    }

    // Enviar respuesta con la paleta
    res.status(200).json({ message: "Paleta obtenida", pallette: existingPallette });
  } catch (error) {
    console.error("Error al obtener la paleta:", error);
    res.status(500).json({ error: "Hubo un error al obtener la paleta" });
  }
};
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const uploadsDir = path.join(__dirname, "../../uploads");

// Subir imagen
export const uploadImage = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ error: "No se subió ninguna imagen" });
    return;
  }
  prisma.media.create({
    data: {
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      type: 'image',
    },
  }).then(media => {
    res.json(media);
  }).catch(() => {
    res.status(500).json({ error: "Error al guardar en la base de datos" });
  });
};

// Subir video con metadatos y subtítulos
export const uploadVideo = (req: Request, res: Response): void => {
  // Espera: req.files = { file: [video], subtitlesEs: [es], subtitlesEn: [en] }
  const files = req.files as {
    file?: Express.Multer.File[];
    subtitlesEs?: Express.Multer.File[];
    subtitlesEn?: Express.Multer.File[];
  };
  const videoFile = files?.file?.[0];
  const subtitlesEsFile = files?.subtitlesEs?.[0];
  const subtitlesEnFile = files?.subtitlesEn?.[0];
  const { title, description } = req.body;

  if (!videoFile || !subtitlesEsFile || !subtitlesEnFile || !title || !description) {
    res.status(400).json({ error: "Faltan campos requeridos (video, subtítulos, título o descripción)" });
    return;
  }

  prisma.media.create({
    data: {
      filename: videoFile.filename,
      url: `/uploads/${videoFile.filename}`,
      type: 'video',
      title,
      description,
      subtitlesEs: `/uploads/${subtitlesEsFile.filename}`,
      subtitlesEn: `/uploads/${subtitlesEnFile.filename}`,
    },
  }).then(media => {
    res.json(media);
  }).catch(() => {
    res.status(500).json({ error: "Error al guardar en la base de datos" });
  });
};

// Listar imágenes
export const listImages = (req: Request, res: Response): void => {
  prisma.media.findMany({ where: { type: 'image' }, orderBy: { createdAt: 'desc' } })
    .then(images => res.json(images))
    .catch(() => res.status(500).json({ error: "Error al leer la base de datos" }));
};

// Listar videos
export const listVideos = (req: Request, res: Response): void => {
  prisma.media.findMany({ where: { type: 'video' }, orderBy: { createdAt: 'desc' } })
    .then(videos => res.json(videos))
    .catch(() => res.status(500).json({ error: "Error al leer la base de datos" }));
};

// Obtener imagen específica
export const getImage = (req: Request, res: Response): void => {
  const filePath = path.join(uploadsDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: "Imagen no encontrada" });
    return;
  }
  res.sendFile(filePath);
};

// Obtener video específico
export const getVideo = (req: Request, res: Response): void => {
  const filePath = path.join(uploadsDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: "Video no encontrado" });
    return;
  }
  res.sendFile(filePath);
};

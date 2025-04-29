import { Router } from "express";
import upload from "../libs/multerConfig";
import {
  uploadImage,
  uploadVideo,
  listImages,
  listVideos,
  getImage,
  getVideo,
} from "../controllers/mediaController";

const router = Router();

// Subir imagen
router.post("/upload-image", upload.single("file"), uploadImage);
// Subir video con metadatos y subtítulos
router.post(
  "/upload-video",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "subtitlesEs", maxCount: 1 },
    { name: "subtitlesEn", maxCount: 1 },
  ]),
  uploadVideo
);
// Listar imágenes
router.get("/images", listImages);
// Listar videos
router.get("/videos", listVideos);
// Obtener imagen específica
router.get("/image/:filename", getImage);
// Obtener video específico
router.get("/video/:filename", getVideo);

export default router;

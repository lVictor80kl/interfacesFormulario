import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../models/user"
import { generateToken } from "../services/auth.services";

export const register = async(req:Request, res: Response): Promise<void>=> {
    
    const {email,password} = req.body

    try{
        if(!password) throw new Error("La contraseña es obligatoria")
        if(!email) throw new Error("El email es obligatorio")
    
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await prisma.user.create(
            {
                data: {
                    email,
                    password: hashedPassword
                }
            }

        )
        res.status(201).json({mensaje:"Usuario creado"})
        
    } catch(error){
        if(!email){
            res.status(400).json({message: "el email es obligatoria"})
        }
        if(!password){
            res.status(400).json({message: "la contraseña es obligatoria"})
        }
        console.log(error)
        res.status(500).json({error: "Hubo un error en el registro"})
    }
    
   
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      // Busca el usuario en la base de datos
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      // Verifica si el usuario existe
      if (!user) {
        res.status(404).json({ error: "Usuario no encontrado" });
      } else {
        // Compara la contraseña proporcionada con la almacenada
        const passwordmatch = await bcrypt.compare(password, user.password);
  
        // Si la contraseña no coincide
        if (!passwordmatch) {
          res.status(401).json({ error: "Contraseña incorrecta" });
        } else {
            const token = generateToken(user)
          // Si todo está bien, envía una respuesta exitosa
          res.status(200).json({ message: "Inicio de sesión exitoso", token:`${token}`});
        }
      }
    } catch (error) {
      console.error(error); // Registra el error en la consola
      res.status(500).json({ error: "Error en el servidor" });
    }
  };
import { Request, Response } from "express";
import { pool } from "../config/connectiondb";

const saveDashboard = async (req: Request, res: Response) => {
  const { cantidad, ...dashFields } = req.body;

  if (!cantidad || cantidad < 1) {
    return res.status(400).json({ message: "La cantidad debe ser al menos 1" });
  }

  const dashKeys = Object.keys(dashFields);
  if (dashKeys.length !== cantidad) {
    return res.status(400).json({
      message: "La cantidad de campos no coincide con la cantidad especificada",
    });
  }

  for (const key in dashFields) {
    if (typeof dashFields[key] !== "string" || dashFields[key].length > 900) {
      return res.status(400).json({
        message: `El campo '${key}' debe ser una cadena con menos de 900 caracteres`,
      });
    }
  }

  try {
    const connection = await pool.getConnection();

    for (const key in dashFields) {
      const query = `INSERT INTO dashboard (linkdashboard) VALUES (?)`;
      await connection.query(query, [dashFields[key]]);
    }

    connection.release();

    return res.status(200).json({ message: "Datos insertados correctamente" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error al insertar datos" });
  }
};

const getDashboard = async (_req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    const query = "SELECT * FROM dashboard";
    const result = await connection.query(query);

    return res.status(200).json({
      message: "Datos obtenidos correctamente",
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error al obtener los datos" });
  }
};

export { saveDashboard, getDashboard };

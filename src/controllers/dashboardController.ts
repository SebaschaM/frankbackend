import { Request, Response } from "express";
import { pool } from "../config/connectiondb";

const saveDashboard = async (req: Request, res: Response) => {
  const { dash1, dash2, dash3, dash4 } = req.body;

  if (!dash1 || !dash2 || !dash3 || !dash4) {
    return res.status(400).json({ message: "Faltan campos por llenar" });
  }

  try {
    const connection = await pool.getConnection();
    const query =
      "INSERT INTO dashboard (dash1, dash2, dash3, dash4) VALUES (?, ?, ?, ?)";
    await connection.query(query, [dash1, dash2, dash3, dash4]);
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
    const [rows] = await connection.query(query);
    connection.release();

    return res.status(200).json({ 
      ok: true,
      data: rows,
      message: "Datos obtenidos correctamente"
     });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error al obtener los datos" });
  }
};

export { saveDashboard, getDashboard };

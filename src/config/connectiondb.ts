import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "151.106.97.102",
  user: "u777467137_rootpracticasf",
  database: "u777467137_practicasfrank",
  password: "#xZ6]X@0cn=",
  connectionLimit: 5,
});

async function connectToDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log("Conectado a la BD 🚀");
    connection.release();
  } catch (err) {
    console.error("Error al conectar a la BD:", err);
  }
}

export { connectToDatabase, pool };

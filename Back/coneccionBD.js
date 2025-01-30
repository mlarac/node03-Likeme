const { Pool } = require('pg');

// Configuración de la conexión
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'likeme',
  password: 'lara1996',
  port: 5432, // Puerto por defecto de PostgreSQL
});

// Función para obtener una conexión del pool
const getConnection = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
};

// Función para ejecutar consultas
const query = async (text, params) => {
  const client = await getConnection();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  query,
  getConnection,
};
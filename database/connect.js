import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
dotenv.config()

const db = mysql.createPool({
  // UNTUK LOKAL
  // host: "localhost",
  // user: "root",
  // database: "bengkel",
  // password: "",

  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, //!sdw%2sdscas.`

  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

// query adalah string
// value adalah array query
async function query(query, value) {
  try {
    const [executeQuery] = await db.query(query, value ?? []) // hasil dari query
    return executeQuery
  } catch (error) {
    console.log(error)
  }
}

export default query

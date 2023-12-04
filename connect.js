import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
import mysql2 from 'mysql2'
dotenv.config()

export const db = new Sequelize({
  // dialect: 'mysql',
  dialectModule: mysql2,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

import {Sequelize} from 'sequelize'
import {db} from '../database/connect.js'

const {DataTypes} = Sequelize

export const UserCustomer = db.define(
  'customer',
  {
    id_customer: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Ini menentukan id_customer sebagai kunci utama
      autoIncrement: true, // Mengasumsikan id_customer akan diinkrementasi otomatis
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    tlp: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
)
export const UserAdmin = db.define(
  'admin',
  {
    id_admin: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Ini menentukan id_customer sebagai kunci utama
      autoIncrement: true, // Mengasumsikan id_customer akan diinkrementasi otomatis
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    tlp: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
)

// export default (UserAdmin, UserCustomer)
// ;(async () => {
//   await db.sync()
// })()

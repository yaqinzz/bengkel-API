import {db} from '../database/connect.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {response} from '../response.js'
import {UserAdmin, UserCustomer} from '../models/UserModel.js'

export const home = (req, res) => {
  response(200, 'selamat datang', 'BENGKEL API', res)
}

export const registerCustomer = async (req, res) => {
  try {
    // Periksa apakah pengguna sudah ada
    const existingAdmin = await UserCustomer.findOne({
      where: {
        username: req.body.username,
      },
    })

    if (existingAdmin) {
      return res.status(409).json('User already exists!')
    }

    // Buat pengguna baru
    // Hash password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    // Simpan pengguna baru ke database
    const newAdmin = await UserCustomer.create({
      name: req.body.name,
      tlp: req.body.tlp,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    })

    return res.status(200).json('User has been created.')
  } catch (error) {
    console.error(error)
    return res.status(500).json(error.message || 'Internal Server Error')
  }
}
export const registerAdmin = async (req, res) => {
  try {
    // Periksa apakah pengguna sudah ada
    const existingAdmin = await UserAdmin.findOne({
      where: {
        username: req.body.username,
      },
    })

    if (existingAdmin) {
      return res.status(409).json('User already exists!')
    }

    // Buat pengguna baru
    // Hash password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    // Simpan pengguna baru ke database
    const newAdmin = await UserAdmin.create({
      name: req.body.name,
      tlp: req.body.tlp,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    })

    return res.status(200).json('User has been created.')
  } catch (error) {
    console.error(error)
    return res.status(500).json(error.message || 'Internal Server Error')
  }
}
export const loginAdmin = (req, res) => {
  const q = 'SELECT * FROM admin WHERE username = ?'

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length === 0) return res.status(404).json('User not found!')

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
    if (!checkPassword) return res.status(400).json('Wrong password or username!')

    const token = jwt.sign({id: data[0].id}, 'secretkey')

    const {password, ...others} = data[0]
    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others)
  })
}
export const loginCustomer = (req, res) => {
  const q = 'SELECT * FROM customer WHERE username = ?'

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length === 0) return res.status(404).json('User not found!')

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
    if (!checkPassword) return res.status(400).json('Wrong password or username!')

    const token = jwt.sign({id: data[0].id}, 'secretkey')

    const {password, ...others} = data[0]
    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others)
  })
}
export const logout = (req, res) => {
  res
    .clearCookie('accessToken', {
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json('User has been logged out.')
}

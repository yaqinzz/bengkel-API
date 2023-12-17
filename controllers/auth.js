import query from '../database/connect.js'
import bcryptjs from 'bcryptjs'
import {randomUUID} from 'crypto'

import jwt from 'jsonwebtoken'
import {response} from '../response.js'

export const home = (req, res) => {
  response(200, 'selamat datang', 'BENGKEL API', res)
}

export const registerCustomer = async (req, res) => {
  const {name, tlp, email, username, password, confPassword} = req.body

  if (
    name === undefined ||
    name === '' ||
    tlp === undefined ||
    tlp === '' ||
    email === undefined ||
    email === '' ||
    username === undefined ||
    username === '' ||
    password === undefined ||
    password === '' ||
    confPassword === undefined ||
    confPassword === ''
  )
    return res.status(400).json('Invalid data!')

  if (password !== confPassword) return res.status(400).json('Password not match!')

  try {
    // logic handling
    const isDuplicate = await query(
      `
        SELECT id_customer FROM customer WHERE username = ? 
    `,
      [username]
    )

    if (isDuplicate.length > 0) return res.status(400).json('User already exists!')

    const salt = await bcryptjs.genSalt(12)
    const hash = await bcryptjs.hash(password, salt)

    await query(
      `
        INSERT INTO customer (
            uuid, name,tlp, email, username, password, createdAt,updatedAt
        ) VALUES (
            ?, ?, ?, ?, ?,?,NOW(),NOW()
        );
    `,
      [randomUUID(), name, tlp, email, username, hash]
    )

    return res.status(200).json({message: 'Register success!'})
  } catch (error) {
    return res.status(400).json('Something went wrong!')
  }
}
export const registerAdmin = async (req, res) => {
  // response(200, 'selamat datang', 'BENGKEL API', res)
  const {name, email, tlp, username, password} = req.body

  if (
    name === undefined ||
    name === '' ||
    email === undefined ||
    email === '' ||
    username === undefined ||
    username === '' ||
    password === undefined ||
    password === ''
  )
    return res.status(400).json('Invalid data!')

  try {
    // logic handling
    const isDuplicate = await query(
      `
          SELECT id_admin FROM admin WHERE username = ? 
      `,
      [username]
    )

    if (isDuplicate.length > 0) return res.status(400).json('User already exists!')

    const salt = await bcryptjs.genSalt(12)
    const hash = await bcryptjs.hash(password, salt)

    await query(
      `
          INSERT INTO admin (
              uuid, name, email, username, password, createdAt,updatedAt
          ) VALUES (
              ?, ?, ?, ?,?,NOW(),NOW()
          );
      `,
      [randomUUID(), name, email, username, hash]
    )

    return res.status(200).json({message: 'Register success!'})
  } catch (error) {
    return res.status(400).json('Something went wrong!')
  }
}
export const loginAdmin = async (req, res) => {
  const {username, password} = req.body
  try {
    const q = 'SELECT * FROM admin WHERE username = ?'

    const data = await query(q, [username])

    if (data.length === 0) {
      return res.status(404).json('User not found!')
    }

    const checkPassword = bcryptjs.compareSync(password, data[0].password)
    if (!checkPassword) {
      return res.status(400).json('Wrong password or name!')
    }

    const token = jwt.sign({id_admin: data[0].id_admin}, 'secretkey')

    const {password: _, ...others} = data[0] // Rename password to _ to exclude it
    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Something went wrong!')
  }
}
export const loginCustomer = async (req, res) => {
  const {username, password} = req.body
  try {
    const q = 'SELECT * FROM customer WHERE username = ?'

    const data = await query(q, [username])

    if (data.length === 0) {
      return res.status(404).json('User not found!')
    }

    const checkPassword = bcryptjs.compareSync(password, data[0].password)
    if (!checkPassword) {
      return res.status(400).json('Wrong password or name!')
    }

    const token = jwt.sign({id_customer: data[0].id_customer}, 'secretkey')

    const {password: _, ...others} = data[0] // Rename password to _ to exclude it
    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Something went wrong!')
  }
}
export const logout = async (req, res) => {
  try {
    res
      .clearCookie('accessToken', {
        secure: true,
        sameSite: 'none',
      })
      .status(200)
      .json('User has been logged out.')
  } catch (error) {
    console.error('Error during logout:', error)
    res.status(500).json('Internal Server Error')
  }
}

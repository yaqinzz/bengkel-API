import {db} from '../connect.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerCustomer = (req, res) => {
  //check user  if exit
  const q = 'SELECT * FROM customer WHERE username =?'

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length) return res.status(409).json('User already exits!')
    //create new user
    //hash pasword
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    const q = 'INSERT INTO customer (`name`,`tlp`,`email`,`username`,`password`) VALUE (?)'

    const values = [req.body.name, req.body.tlp, req.body.email, req.body.username, hashedPassword]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json('User has been created.')
    })
  })
}
export const registerAdmin = (req, res) => {
  //check user  if exit
  const q = 'SELECT * FROM admin WHERE username =?'

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length) return res.status(409).json('User already exits!')
    //create new user
    //hash pasword
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    const q = 'INSERT INTO admin (`name`,`tlp`,`email`,`username`,`password`) VALUE (?)'

    const values = [req.body.name, req.body.tlp, req.body.email, req.body.username, hashedPassword]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json('User has been created.')
    })
  })
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

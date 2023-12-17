import query from '../database/connect.js'
import jwt from 'jsonwebtoken'
import {randomUUID} from 'crypto'

export const addPickup = async (req, res) => {
  const {plat, service, date, time, desc, status, note, merk, tipe, bb, address} = req.body

  try {
    const token = req.cookies.accessToken

    if (!token) {
      return res.status(401).json('Not logged in!')
    }
    jwt.verify(token, 'secretkey', async (err, userInfo) => {
      if (err) {
        return res.status(403).json('Token is not valid or an error occurred.')
      }
      const userDate = date // Gantilah ini dengan inputan pengguna sebenarnya
      const userTime = time
      await query(
        `
            INSERT INTO pickup (
              uuid, id_customer, plat, service,date,time, status, note,merk,tipe,bb,address
            ) VALUES (
                ?, ?, ?, ?,?,?,?,?,?,?,?,?
            );
        `,
        [randomUUID(), userInfo.id_customer, plat, service, userDate, userTime, status, note, merk, tipe, bb, address]
      )
    })

    return res.status(200).json({message: 'pickup has been created.'})
  } catch (error) {
    console.error(error) // Log error for debugging
    return res.status(403).json('Token is not valid or an error occurred.')
  }
}

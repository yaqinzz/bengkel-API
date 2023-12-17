import query from '../database/connect.js'
import jwt from 'jsonwebtoken'
import {randomUUID} from 'crypto'

export const addBooking = async (req, res) => {
  const {plat, service, date, time, desc, status, note, merk, tipe, bb} = req.body

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
            INSERT INTO booking (
              uuid, id_customer, plat, service,date,time, \`desc\`, status, note,merk,tipe,bb
            ) VALUES (
                ?, ?, ?, ?,?,?,?,?,?,?,?,?
            );
        `,
        [randomUUID(), userInfo.id_customer, plat, service, userDate, userTime, desc, status, note, merk, tipe, bb]
      )
    })

    return res.status(200).json('Booking has been created.')
  } catch (error) {
    console.error(error) // Log error for debugging
    return res.status(403).json('Token is not valid or an error occurred.')
  }
}

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
export const booking = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 5
    const search = req.query.search_query || ''
    const offset = limit * page

    // Count total rows
    const totalRowsResult = await query(
      `
      SELECT COUNT(*) as totalRows
      FROM booking
      WHERE plat LIKE ? OR merk LIKE ?
    `,
      [`%${search}%`, `%${search}%`]
    )

    if (!totalRowsResult || totalRowsResult.length === 0 || totalRowsResult[0].totalRows === undefined) {
      throw new Error('Failed to retrieve totalRows')
    }

    const totalRows = totalRowsResult[0].totalRows

    const totalPage = Math.ceil(totalRows / limit)

    // Fetch data with pagination
    const result = await query(
      `
      SELECT
      customer.name,
      customer.pict
      booking.time,
      booking.status,
  FROM booking
  LEFT JOIN customer ON booking.id_customer = customer.id_customer
  WHERE plat LIKE ? OR merk LIKE ?
  ORDER BY id_booking ASC
  LIMIT ? OFFSET ?;

    `,
      [`%${search}%`, `%${search}%`, limit, offset]
    )

    res.json({
      result,
      message: 'booking',
      page,
      limit,
      totalRows,
      totalPage,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json(error.message || 'Internal Server Error')
  }
}

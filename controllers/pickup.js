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
export const pickup = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 5
    // const search = req.query.search_query || ''
    const offset = limit * page

    // Count total rows
    const totalRowsResult = await query(
      `
      SELECT COUNT(*) as totalRows
      FROM pickup
      
    `
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
      customer.pict,
      pickup.time,
      pickup.status,
      pickup.id_pickup
  FROM pickup
  LEFT JOIN customer ON pickup.id_customer = customer.id_customer
  ORDER BY id_pickup ASC
  LIMIT ? OFFSET ?;

    `,
      [limit, offset]
    )

    res.json({
      result,
      message: 'pickup',
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
export const detail = async (req, res) => {
  try {
    const detail = req.params.detailId
    const response = await query(
      `SELECT customer.name,customer.tlp, pickup.* FROM pickup 
    LEFT JOIN customer ON pickup.id_customer = customer.id_customer WHERE id_pickup = ?`,
      [detail]
    )

    if (response.length > 0) {
      res.status(200).json(response)
    } else {
      res.status(404).json({message: 'detail not found'})
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: 'Internal Server Error'})
  }
}

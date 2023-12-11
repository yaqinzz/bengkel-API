// import U from '../models/UserModel.js'
// import {Op} from 'sequelize'

// import {UserCustomer} from '../models/UserModel.js'
import query from '../database/connect.js'

export const getUserCustomer = async (req, res) => {
  try {
    const response = await UserCustomer.findOne({
      where: {
        id_customer: req.params.customerId,
      },
    })
    res.status(200).json(response)
  } catch (error) {
    console.log(error.message)
  }
}
export const getUserAllCustomer = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 5
    const search = req.query.search_query || ''
    const offset = limit * page

    // Count total rows
    const totalRowsResult = await query(
      `
      SELECT COUNT(*) as totalRows
      FROM customer
      WHERE name LIKE ? OR email LIKE ?
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
      SELECT *
      FROM customer
      WHERE name LIKE ? OR email LIKE ?
      ORDER BY id_customer DESC
      LIMIT ? OFFSET ?
    `,
      [`%${search}%`, `%${search}%`, limit, offset]
    )

    res.json({
      result: result,
      message: 'data customer',
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json(error.message || 'Internal Server Error')
  }
}

export const updateCustomer = async (req, res) => {
  try {
    await UserCustomer.update(req.body, {
      where: {
        id_customer: req.params.customerId,
      },
    })
    res.status(200).json('User Updated')
  } catch (error) {
    console.log(error.message)
  }
}

export const deletedCustomer = async (req, res) => {
  try {
    // const customerId = req.params.customerId
    // const deleteQuery = `DELETE FROM customer WHERE id_customer = ?`
    const result = await query(`DELETE FROM customer WHERE id_customer = ?`, [req.params.customerId])

    if (result.affectedRows > 0) {
      res.status(200).json('User Deleted')
    } else {
      res.status(404).json('User not found')
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json('Internal Server Error')
  }
}

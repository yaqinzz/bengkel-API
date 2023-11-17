import {db} from '../connect.js'

import {response} from '../response.js'

export const getUserCustomer = (req, res) => {}
export const getUserAllCustomer = (req, res) => {
  const sql = 'SELECT * FROM customer'
  db.query(sql, (error, result) => {
    //hasil data dari mysql
    if (error) throw error
    response(200, result, 'data semua customer', res)
  })
}

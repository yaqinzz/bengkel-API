// import db from '../connect'
import {db} from '../connect.js'

import {response} from '../response.js'

export const getUserAdmin = (req, res) => {}
export const getUserAllAdmin = (req, res) => {
  const sql = 'SELECT * FROM admin'
  db.query(sql, (error, result) => {
    //hasil data dari mysql
    if (error) throw error
    response(200, result, 'data semua admin', res)
  })
}

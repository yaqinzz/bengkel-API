import query from '../database/connect.js'

export const get = async (req, res) => {
  const month = req.query.month
  const year = req.query.year
  const q = "SELECT GROUP_CONCAT(id_report) AS id_report, date, service, SUM(unit) AS unit, price, SUM(total) AS total FROM report WHERE EXTRACT(MONTH FROM date) = ? AND EXTRACT(YEAR FROM date) = ? GROUP BY date, service, price ORDER BY date"
  const placeholder = [month, year]

  try {
    const result = await query(q, placeholder)
    res.send(result)
  } catch (error) {
    console.log(error)
  }
}

export const post = async (req, res) => {
  const {tanggal, layanan, satuan, harga} = req.body
  const placeholder = [tanggal, layanan, satuan, harga]
  
  try {
    const result = await query(`INSERT INTO report (date, service, unit, price) VALUES (?, ?, ?, ?)`, placeholder) 
    res.send(`Laporan Ditambah ${result}`)
  } catch (error) {
    console.log(error)
  }
}

export const del = async (req, res) => {
  const id = req.params.id

  try {
    const result = query(`DELETE FROM report WHERE id_report IN (${id})`)
    res.send(`Delete data ${result}`)
  } catch (error) {
    console.log(error)
  }
}
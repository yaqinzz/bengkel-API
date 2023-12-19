import query from '../database/connect.js'

export const get = async (req, res) => {
  const q = "SELECT * FROM review"
  const placeholder = []

  try {
    const result = await query(q, placeholder)
    res.send(result)
  } catch (error) {
    console.log(error)
  }
}
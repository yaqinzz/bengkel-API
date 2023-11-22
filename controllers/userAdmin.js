import {UserAdmin} from '../models/UserModel.js'
import {Op} from 'sequelize'

export const getUserAdmin = async (req, res) => {
  try {
    const response = await UserAdmin.findOne({
      where: {
        id_admin: req.params.adminId,
      },
    })
    res.status(200).json(response)
  } catch (error) {
    console.log(error.message)
  }
}
export const getUserAllAdmin = async (req, res) => {
  const page = parseInt(req.query.page) || 0
  const limit = parseInt(req.query.limit) || 5
  const search = req.query.search_query || ''
  const offset = limit * page
  const totalRows = await UserAdmin.count({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: '%' + search + '%',
          },
        },
        {
          email: {
            [Op.like]: '%' + search + '%',
          },
        },
      ],
    },
  })
  const totalPage = Math.ceil(totalRows / limit)
  const result = await UserAdmin.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: '%' + search + '%',
          },
        },
        {
          email: {
            [Op.like]: '%' + search + '%',
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [['id_admin', 'DESC']],
  })
  res.json({
    result: result,
    message: 'data admin',
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  })
}
export const updateAdmin = async (req, res) => {
  try {
    await UserAdmin.update(req.body, {
      where: {
        id_admin: req.params.adminId,
      },
    })
    res.status(200).json('User Updated')
  } catch (error) {
    console.log(error.message)
  }
}

export const deletedAdmin = async (req, res) => {
  try {
    await UserAdmin.destroy({
      where: {
        id_admin: req.params.adminId,
      },
    })
    res.status(200).json('User Deleted')
  } catch (error) {
    console.log(error.message)
  }
}

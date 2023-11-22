// import U from '../models/UserModel.js'
import {Op} from 'sequelize'

import {UserCustomer} from '../models/UserModel.js'

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
  const page = parseInt(req.query.page) || 0
  const limit = parseInt(req.query.limit) || 10
  const search = req.query.search_query || ''
  const offset = limit * page
  const totalRows = await UserCustomer.count({
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
  const result = await UserCustomer.findAll({
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
    order: [['id_customer', 'DESC']],
  })
  res.json({
    result: result,
    message: 'data customer',
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  })
  // try {
  //   const result = await User.findAll()
  //   // response(200, result, 'data semua customer', res)
  //   res.status(200).json(response)
  // } catch (error) {
  //   console.log(error.message)
  // }
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
    await UserCustomer.destroy({
      where: {
        id_customer: req.params.customerId,
      },
    })
    res.status(200).json('User Deleted')
  } catch (error) {
    console.log(error.message)
  }
}

/* eslint-disable babel/new-cap */
import {DataTypes} from 'sequelize'
import * as enums from '../utils/constants'

export default function (sequelize) {
  const schema = {
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(enums.USER_ROLES)
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(enums.USER_STATUS)
    },
    fullname: {
      type: DataTypes.STRING
    }
  }
  const options = {

  }
  return sequelize.define('User', schema, options)
}

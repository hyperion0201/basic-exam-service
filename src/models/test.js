/* eslint-disable babel/new-cap */
import {DataTypes} from 'sequelize'
import * as enums from '../utils/constants'

export default function (sequelize) {
  const schema = {
    extraInfo: {
      type: DataTypes.JSON
    },
    totalScore: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(enums.TEST_STATUS)
    }
  }

  const options = {
  }

  return sequelize.define('Test', schema, options)
}

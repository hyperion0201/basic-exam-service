/* eslint-disable babel/new-cap */
import { DataTypes } from 'sequelize'
import * as enums from '../utils/constants'

export default function (sequelize) {
  const schema = {
    title: {
      type: DataTypes.TEXT({ length: 'medium' })
    },
    choices: {
      type: DataTypes.JSON
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.values(enums.QUESTION_TYPES)
    },
    score: {
      type: DataTypes.INTEGER,
      validate: { min: 1 }
    }
  }

  const options = {
  }

  return sequelize.define('Question', schema, options)
}

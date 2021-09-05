/* eslint-disable babel/new-cap */
import { DataTypes } from 'sequelize'

export default function (sequelize) {
  const schema = {
    answer: {
      type: DataTypes.JSON
    }
  }

  const options = {
  }

  return sequelize.define('UserAnswer', schema, options)
}

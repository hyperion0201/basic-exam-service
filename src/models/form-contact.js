/* eslint-disable babel/new-cap */
import {DataTypes} from 'sequelize'

export default function (sequelize) {
  const schema = {
    email: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    markDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }
  const options = {}
  return sequelize.define('FormContact', schema, options)
}

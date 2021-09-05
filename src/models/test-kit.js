/* eslint-disable babel/new-cap */
import { DataTypes } from 'sequelize'

export default function (sequelize) {
  const schema = {
    description: {
      type: DataTypes.TEXT({ length: 'medium' })
    },
    subject: {
      type: DataTypes.STRING
    },
    course: {
      type: DataTypes.STRING
    },
    startDate: {
      type: DataTypes.DATE
    },
    duration: {
      type: DataTypes.INTEGER
    }
  }
  const options = {
  }

  return sequelize.define('TestKit', schema, options)
}

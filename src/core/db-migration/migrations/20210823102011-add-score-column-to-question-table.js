'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn(
        'Questions',
        'score',
        {
          type: Sequelize.DataTypes.INTEGER
        },
        {transaction}
      )
      await transaction.commit()
    }
    catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn(
        'Questions',
        'score',
        {
          type: Sequelize.DataTypes.INTEGER
        },
        {transaction}
      )
      await transaction.commit()
    }
    catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}

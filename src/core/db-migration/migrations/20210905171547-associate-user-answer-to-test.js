'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(`
      ALTER TABLE "UserAnswers"
      ADD COLUMN "testId" integer
      REFERENCES "Tests"
      ON DELETE RESTRICT
      ON UPDATE CASCADE;`
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(`
      ALTER TABLE "UserAnswers"
      DROP COLUMN "testId";`
    )
  }
}

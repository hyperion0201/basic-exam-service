import { Sequelize } from 'sequelize'
import {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASSWORD,
  DB_USER
  //DB_LOGGING_ENABLED
} from '../../configs'
import * as models from '../../models'

const db = new Sequelize({
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logQueryParameters: true,
  benchmark: true,
  logging: false
})

const modelDefiners = Object.values(models)
// define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner.default(db)
}

// truncate models
for (const model of Object.keys(db.models)) {
  db[model] = db.models[model]
}

// execute any extra setup after the models are defined, such as adding associations.
db.User.hasMany(db.Test, { foreignKey: 'userId', as: 'tests' })
db.Test.belongsTo(db.User, { foreignKey: 'userId' })

db.User.hasMany(db.TestKit, { foreignKey: 'createdBy', as: 'testKits' })
db.TestKit.belongsTo(db.User, { foreignKey: 'createdBy' })

db.TestKit.hasMany(db.Test, { foreignKey: 'testKitId' })
db.Test.belongsTo(db.TestKit, { foreignKey: 'testKitId' })

db.TestKit.hasMany(db.Question, { foreignKey: 'testKitId', as: 'questions' })
db.Question.belongsTo(db.TestKit, { foreignKey: 'testKitId' })

db.UserAnswer.belongsTo(db.Question, { foreignKey: 'questionId' })
db.UserAnswer.belongsTo(db.User, { foreignKey: 'userId' })

export default db

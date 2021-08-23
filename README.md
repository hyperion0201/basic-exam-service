# basic-exam-service [![Pull request linter check](https://github.com/hyperion0201/basic-exam-service/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/hyperion0201/basic-exam-service/actions/workflows/node.js.yml)
An api-rest service that serves requests from basic-exam website project.
### Prerequisites
- Node: `10.22.0`
- yarn: `v1.22.4` or newer

### Developing commands
- `yarn install --frozen-install`: Install depedencies *WITH* lockfile.
- `yarn lint` : Lint source code
- `yarn start`: Start app


### Migration for database
This project was boostraped with `Sequelize CLI`. So some commands below are supported to run migration/seeder scripts.

Note: There are 2 tables called `SequelizeMeta` and `SequelizeData` that reponsible for migration and seeders files and have no impact to the app. So please **do not attempt to remove these columns**.

- `yarn run migrate:all`: Exec all migrations file in `src/core/db-migration/migrations.
- `yarn run seed:all`: Exec all seeders files in `src/core/db-migration/seeders.
- `yarn run migrate:undo`: Undo latest migration file.
- `yarn run migrate:undo:all`: Undo all migration files.
- `yarn run seed:undo`: Undo latest seeder file.
- `yarn run seed:undo:all`: Undo all seeder files.
- `yarn run migrate:create`: Create new migration file, after created, you maybe rename it to anything you want.
- `yarn run seed:create`: Create new seeder file, and you maybe rename it after being created too.

### Environment variables
See [src/config.js](https://github.com/hyperion0201/basic-exam-service/blob/main/src/configs.js) for accepted variables.


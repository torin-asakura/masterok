import * as entities   from './src/entities'
import * as migrations from './src/migrations'

export default {
  type: 'postgres',
  host: '0.0.0.0',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'db',
  migrations: Object.values(migrations),
  entities: Object.values(entities),
  uuidExtension: 'pgcrypto',
  logging: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
}

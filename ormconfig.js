require('dotenv').config()

let config = {}
if (process.env.NODE_ENV === 'development') {
    config = {
        type: 'postgres',
        host: process.env.BD_HOST,
        port: +process.env.BD_PORT,
        username: process.env.BD_USERNAME,
        password: process.env.BD_PASSWORD,
        database: process.env.BD_DATABASE,
        synchronize: false,
        migrations: ['src/database/migrations/*.ts'],
        entities: ['src/app/models/*.ts'],
        cli: {
            migrationsDir: 'src/database/migrations'
        }
    }
} else if (process.env.NODE_ENV === 'production') {
    config = {
        type: 'postgres',
        host: process.env.BD_PRODUCTION_HOST,
        port: +process.env.BD_PRODUCTION_PORT,
        username: process.env.BD_PRODUCTION_USERNAME,
        password: process.env.BD_PRODUCTION_PASSWORD,
        database: process.env.BD_PRODUCTION_DATABASE,
        synchronize: false,
        extra: {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
        },
        migrations: ['build/src/database/migrations/*.js'],
        entities: ['build/src/app/models/*.js'],
        cli: {
            migrationsDir: 'build/src/database/migrations'
        }
    }
}

module.exports = config;
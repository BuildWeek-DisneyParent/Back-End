const localPg = {
  host: "localhost",
  database: "auth",
  user: "admin",
  password: "admin"
};

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './data/auth.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
      },
    production: {
      client: "pg",
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: "./migrations"
      },
      seeds: {
        directory: "./seeds"
      }
    },
  }
};
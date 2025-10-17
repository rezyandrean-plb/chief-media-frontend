// Database configuration
export const databaseConfig = {
  client: 'postgres',
  host: 'kw-1.cspkrkicfu7p.ap-southeast-1.rds.amazonaws.com',
  port: 5432,
  name: 'kwsg-gigeconomy',
  username: 'postgres',
  password: 'kwpostgres',
  ssl: true,
  sslRejectUnauthorized: false,
}

// DATABASE_URL for Prisma
export const DATABASE_URL = `postgresql://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.name}?sslmode=require`

// Environment variables that should be set
export const requiredEnvVars = {
  DATABASE_URL,
  DATABASE_CLIENT: databaseConfig.client,
  DATABASE_HOST: databaseConfig.host,
  DATABASE_PORT: databaseConfig.port.toString(),
  DATABASE_NAME: databaseConfig.name,
  DATABASE_USERNAME: databaseConfig.username,
  DATABASE_PASSWORD: databaseConfig.password,
  DATABASE_SSL: databaseConfig.ssl.toString(),
  DATABASE_SSL_REJECT_UNAUTHORIZED: databaseConfig.sslRejectUnauthorized.toString(),
}

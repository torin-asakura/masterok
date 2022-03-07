export interface ProductTypeOrmDbOptions {
  port?: number
  host?: string
  database?: string
  username?: string
  password?: string
}

export interface ProductTypeOrmOptions {
  db?: ProductTypeOrmDbOptions
}

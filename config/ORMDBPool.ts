
require('dotenv').config()

export const ORMDBPool = {
	username: process.env.DB_USER || 'postgres',
	test_database: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASSWORD || 'tankionline123',
	database: process.env.DB_NAME || 'postgres',
	host: process.env.DB_HOST ||  'localhost',
	port: parseInt(process.env.DB_PORT || '5432'),
	driver: process.env.DB_DRIVER,

};

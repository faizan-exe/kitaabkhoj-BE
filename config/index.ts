/**
 *        @file index.sample.js
 *  @repository express-typescript-postgres
 * @application express-typescript-postgres
 *     @summary Server-specific configuration settings for the APIs.
 * @description This is an example of the config file which holds all the confidential credentials.
 */

import { Sequelize } from 'sequelize-typescript';
import { ORMDBPool } from './ORMDBPool'
interface dbClient {
	user: string
	password: string | undefined
	database: string
	host: string
	port: number
	ssl: boolean
	max: number
	idleTimeoutMillis: number
}

/**
 * Database Connection Profile (Primary)
 * PostgreSQL database connection profile (object), used to make a privilaged server-side (non-application)
 * connection to the InnVoyce database.
 */
export const dbObj: dbClient = {
	user: ORMDBPool.username,
	password: ORMDBPool.password,
	database: ORMDBPool.database,
	host: ORMDBPool.host,
	port: ORMDBPool.port,
	ssl: true,
	max: 20,
	idleTimeoutMillis: 10000,
}
export const ORMDB = new Sequelize({
	username: ORMDBPool.username,
	password: ORMDBPool.password,
	database: ORMDBPool.database,
	host: ORMDBPool.host,
	port: ORMDBPool.port,
	dialect: "postgres",
	dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // You might need this option to handle self-signed certificates
        }
    },
	// models: [Contact],
	pool: {
		max: 5,
		min: 0,
		acquire: 60000,
		idle: 10000
	}
});


/**
 * Server Configuration
 * Configurable server object required by the API include settings for the server port (port), a UUID
 * used to encode the authorization token (apiUuid), and the duration of that token (tokenExpiration).
 */
export const server = {
	port: 9000,
	apiUuid: '0eb14adc-a16e-400c-8f55-7d6c016bb36d',
	tokenExpiration: {
		days: 1,
		hours: 8,
		minutes: 0,
		seconds: 0,
	}
}

export const bcryptRounds = {
	saltRounds: 10,
}

/**
 * Email Configuration
 * Postmark (https://postmarkapp.com/) is the email delivery service used for emails sent from the
 * InnVoyce database API (for invitation and password resets, for example). The official
 * Postmark-maintained Postmark.js package for Node.js is used to access a given virtual Postmark
 * server and utilize the Postmark API. Each Postmark server is intended to correspond to a given
 * code server, that is, one each for the dev, stage, and prod servers to which code is deployed.
 * Below, the Postmark Server API Token (pmServerApiToken) identifies and authenticates to a specific
 * Postmark server, from which all InnVoyce database API email on the associated code
 * server will be sent. Again, that Server API Token should differ across the various API code servers.
 * Also, note that the from address below must satisfy Postmark's Sender Signature requirements, that
 * is, it must be a verified domain or single email address.
 */

export const email = {
	primary: {
		token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
		from: 'hassantariq5544@gmail.com'
	},

	addresses: {
		support: 'hassantariq5544@gmail.com'
	}
};

/**
 * Generate a random password of your desired
 * length.
 */

export const randomPasswordLength = 10;

/**
 * Customize your logs & don't let them occupy
 * too much space.
 */

export const logs = {
	maxFiles: 5,
	maxFileSize: 20971520, // 20 MB
	zipOldLogs: true
}



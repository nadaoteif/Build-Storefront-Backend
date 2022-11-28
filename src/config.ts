import dotenv from 'dotenv';

dotenv.config()

const {
    PORT,
    MY_ENV,
    MY_HOST,
    DB_PORT,
    MY_USER,
    MY_PASSWORD,
    MY_DB,
    MY_TEST_DB,
    PEPPER,
    SALT_ROUNDS,
    TOKEN_SECRET,
} = process.env;


export default {
    port: PORT,
    host: MY_HOST,
    dbPort: DB_PORT,
    database: MY_ENV === 'development' ? MY_DB : MY_TEST_DB,
    user: MY_USER,
    password: MY_PASSWORD,
    pepper: PEPPER,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET
  };
import dotenv from 'dotenv';

dotenv.config();

// mySQL
const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'mydb2';
const MYSQL_USER = process.env.MYSQL_HOST || 'root';
const MYSQL_PASS = process.env.MYSQL_HOST || 'khanhkma2001';

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};

// Server
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

// Message
const MESSAGE_LOGIN_ERROR_USERNAME_PASSWORD = process.env.MESSAGE_LOGIN_ERROR_USERNAME_PASSWORD || 'Login false';
const MESSAGE_LOGIN_SUCCESSFUL = process.env.MESSAGE_LOGIN_SUCCESSFUL || 'Login successful';
const MESSAGE_REGISTER_ERROR = process.env.MESSAGE_REGISTER_ERROR || 'Admin name already exists!!';
const MESSAGE_REGISTER_SUCCESSFUL = process.env.MESSAGE_REGISTER_SUCCESSFUL || 'Register successful';
const MESSAGE_BAD_REQUEST = process.env.MESSAGE_BAD_REQUEST || 'Bad Request'
const MESSAGE = {
    message: {
        login_error: MESSAGE_LOGIN_ERROR_USERNAME_PASSWORD,
        login_successful: MESSAGE_LOGIN_SUCCESSFUL,
        register_error: MESSAGE_REGISTER_ERROR,
        register_succesfull: MESSAGE_REGISTER_SUCCESSFUL,
        bad_request: MESSAGE_BAD_REQUEST
    },
    status: {
        status_false: 'false',
        status_ok: 'OK'
    }
}

const config = {
    mysql: MYSQL,
    server: SERVER,
    message: MESSAGE
};

export default config;
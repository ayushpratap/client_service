require('dotenv').config();

let CONFIG = {};

CONFIG.app = process.env.APP || 'dev';
CONFIG.port_unsecured = process.env.PORT_UNSECURED || '8000';
CONFIG.port = process.env.PORT || '8443';
CONFIG.oai_ip = process.env.OAI_IP || '10.0.97.243';
CONFIG.oai_port = process.env.OAI_PORT || '60030';
CONFIG.db_dialect = process.env.DB_DIALECT || 'mongodb';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '27017';
CONFIG.db_name = process.env.DB_NAME || 'Alexa';
CONFIG.db_name_acc = process.env.DB_NAME_ACC || 'amazon_accounts';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || '';
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'LittleBitOFThisAndThat';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '604800';

module.exports = CONFIG;

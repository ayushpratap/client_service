require('dotenv').config();

let CONFIG = {};

CONFIG.app = process.env.APP || 'dev';
CONFIG.tcp_server_port = process.env.TCP_SERVER_PORT || '9001';
CONFIG.tcp_server_host = process.env.TCP_SERVER_HOST || '3.85.228.22';

module.exports = CONFIG;
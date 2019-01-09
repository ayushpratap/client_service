require('dotenv').config();

let CONFIG = {};

CONFIG.app = process.env.APP || 'dev';
CONFIG.tcp_server_port = process.env.TCP_SERVER_PORT || '9001';
CONFIG.tcp_server_host = process.env.TCP_SERVER_HOST || 'ec2-3-80-153-122.compute-1.amazonaws.com';
CONFIG.client_service_url = process.env.CLIENT_SERVICE_URL || 'https://127.0.0.1:8443';

module.exports = CONFIG;
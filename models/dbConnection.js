const { Sequelize } = require('sequelize');
const config = require("../utils/config");
const { DB_IP } = require('../utils/config');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
    host: DB_IP,
    dialect: 'mysql',
    logging: false
});
async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = sequelize;


// docker run -p 3306:3306 --name mysql -v /mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.21
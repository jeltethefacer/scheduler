const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('diensten_rooster', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql'
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
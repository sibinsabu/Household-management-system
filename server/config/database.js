const sequelize = require('sequelize')

const database = new sequelize('household', 'root', '',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = database
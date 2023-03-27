const {DataTypes} = require('sequelize')
const Users = require('../models/User.Model')
const database = require('../config/database')

const Reviews = database.define("review",{
    Review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description:{
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id',
          },
    },
},
{
    freezeTableName: true,
    timestamps: true,
}
);


Reviews.belongsTo(Users, { foreignKey: 'user_id' });

database.sync()
  .then(() => {
    console.log("table Synced successfully!");
  })
  .catch((error) => {
    console.log("Unable to Synced table", error);
});

module.exports = Reviews;
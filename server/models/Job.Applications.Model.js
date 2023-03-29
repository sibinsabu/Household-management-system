const {DataTypes} = require('sequelize')
const database = require('../config/database')

const Users = database.define("users",{
    applicant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
      },
    job_id: {
        type: DataTypes.INTEGER,
      },
},
{
    freezeTableName: true,
    timestamps: true,
}
);

db.sync()
  .then(() => {
    console.log("table Synced successfully!");
  })
  .catch((error) => {
    console.log("Unable to Synced table", error);
});

module.exports = Users;
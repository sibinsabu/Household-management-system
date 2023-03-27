const {DataTypes} = require('sequelize')
const database = require('../config/database')

const Users = database.define("users",{
    username:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
    },
    phoneNumber:{
        type: DataTypes.INTEGER,
    },
    password:{
        type: DataTypes.STRING,
    },
    accountType:{
        type: DataTypes.STRING,
    },
    jobTitle:{
        type: DataTypes.STRING,
    },
    AboutMe:{
        type: DataTypes.STRING,
    },
    location:{
        type: DataTypes.STRING,
    },
},
{
    freezeTableName: true,
    timestamps: true,
}
);

database.sync()
  .then(() => {
    console.log("table Synced successfully!");
  })
  .catch((error) => {
    console.log("Unable to Synced table", error);
});

module.exports = Users;
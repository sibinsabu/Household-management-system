const {DataTypes} = require('sequelize')
const database = require('../config/database')
const Users = require('../models/User.Model')
const JobListing = require('../models/Job.ListingModel')

const Applicant = database.define("Applicants",{
    applicant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Users,
          key: 'id',
      },
    },
    job_id: {
      type: DataTypes.INTEGER,
      references: {
          model: JobListing,
          key: 'job_id',
      },
    },
    date:{
      type: DataTypes.DATE,
    }, 
},
{
    freezeTableName: true,
    timestamps: true,
}
);

Applicant.belongsTo(Users, { foreignKey: 'user_id' });
Applicant.belongsTo(JobListing, { foreignKey: 'job_id' });

database.sync()
  .then(() => {
    console.log("table Synced successfully!");
  })
  .catch((error) => {
    console.log("Unable to Synced table", error);
});

module.exports = Applicant;
const express = require("express")
const cors = require("cors")
const morgan = require("morgan");
const bodyParser = require('body-parser');
const database = require("./config/database");
const app = express();
const UserRoutes = require('./routes/User.Route')
const BlogRoutes = require('./routes/Blog.Route')
const JobListingRoutes = require('./routes/Job.Listing.Route')
const ApplicantRoutes = require('./routes/Job.Applications.Route')
const RatingRoutes = require('./routes/Rating.Route')

try{
    database.authenticate();
    console.log('the application is now as connection to the database');
}catch(err){
    console.log('database connection failed');
}


app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(morgan("dev"));
app.use('/authentication', UserRoutes)
app.use('/Blogs', BlogRoutes)
app.use('/JobListings', JobListingRoutes)
app.use('/JobsApplication', ApplicantRoutes)
app.use('/Ratings', RatingRoutes)


app.listen(5000, () => console.log("this server is running at port 5000"));
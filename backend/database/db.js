const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "PMA",
    })
    .then((data) => {
      console.log(`Connected to MongoDb server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("Error Connecting to MongoDb:", error);
    });
};

module.exports = connectDatabase;

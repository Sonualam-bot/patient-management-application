const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./database/db");

//config
dotenv.config({ path: "backend/config/config.env" });

//connect to db
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is working ong http://localhost:${process.env.PORT}`);
});

const dotenv = require("dotenv");

const app = require("./app");
const connectDatabase = require("./config/database");

// Config
dotenv.config({ path: "./config/port.env" });

// Connecting to database
connectDatabase();

const PORT = process.env.PORT;

console.log(process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});

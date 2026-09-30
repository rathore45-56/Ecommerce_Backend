const dns = require("dns");
dns.setDefaultResultOrder("ipv4first"); // 👈 यह लाइन सबसे ऊपर

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

const route = require("./routes/userRoutes");
const route1 = require("./routes/productRoutes");
const route2 = require("./routes/cartRoutes");
const route3=require('./routes/orderRoute');


app.use("/api", route);
app.use("/api", route1);
app.use("/api", route2);
app.use('/api',route3);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
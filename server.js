const express = require("express");
const cors = require("cors");
require("dotenv").config();

const rootRouter = require("./routes/index");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", rootRouter);

app.listen(PORT, () => console.log("Mail server running in port:", PORT));

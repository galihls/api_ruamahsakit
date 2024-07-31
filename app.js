const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

const db = require("./config").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const auth = require("./routes/auth");
const entity = require("./routes/entity");

app.use("/api/auth", auth);
app.use("/api/hospitals", entity);

app.listen(port, () => console.log(`Server running on port ${port}`));

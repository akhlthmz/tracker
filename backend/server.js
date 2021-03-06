const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//Init middlewares CORS and body parser
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection made successfully");
});

const projectsRouter = require("./routes/projects");
const registerRouter = require("./routes/register");
const bugsRouter = require("./routes/bugs");
const userRouter = require("./routes/user");

app.use("/projects", projectsRouter);
app.use("/users", registerRouter);
app.use("/projects/bugs", bugsRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello from node express app</h1>");
});

app.listen(port, () => {
  console.log(`The app is listening at port ${port}`);
});

var express = require("express");
var app = express();
var apps = require("http").Server(app);
var io = require("socket.io")(apps);

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var User = require("./Routes/User");
var Pic = require("./Routes/ProfilePic");
var Posts = require("./Routes/Post");
//
app.use(cors());

app.use(express.static("Uploads"));
app.use(express.static("ProfilePics"));

//useUnifiedTopology: true

mongoose
  .connect("mongodb://localhost:27017/ppl", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch(err => {
    console.error(err);
  });
mongoose.connection.once("open", () => {
  console.log("Database connected ");
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "Database connection error:")
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/", User);

app.use("/time", Posts);
app.use("/pic", Pic);

var server = app.listen(8088, () => {
  var host = server.address().address;

  var port = server.address().port;

  //sudo kill -9 $(sudo lsof -t -i:8088)
  console.log("Example app listening at http://%s:%s", host, port);
});

io.on("connection", function(socket) {
  io.emit("this", { will: "be received by everyone" });

  socket.on("private message", function(from, msg) {
    console.log("I received a private message by ", from, " saying ", msg);
  });
});

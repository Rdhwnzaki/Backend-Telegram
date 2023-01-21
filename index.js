const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const helmet = require("helmet");
const xss = require("xss-clean");
const socketController = require("./src/socket/index");
const http = require("http");
const socket = require("socket.io");
var moment = require("moment");
const mainRouter = require("./src/routes/index");
const { resp } = require("./src/middleware/common");
const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use("/", mainRouter);
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(xss());

app.use(bodyParser.json());
app.use("/img", express.static("./upload"));

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("new user connect");
  socketController(io, socket);
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`app running on ${PORT}`);
});

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const morgan = require("morgan");
// require("dotenv").config();
// const helmet = require("helmet");
// const xss = require("xss-clean");
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// var moment = require("moment");

// const mainRouter = require("./src/routes/index");
// const { resp } = require("./src/middleware/common");

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });
// const PORT = 4000;

// io.on("connection", (socket) => {
//   console.log(`user connect ${socket.id}`);

//   socket.on("initialRoom", ({ room }) => {
//     console.log(room);
//     socket.join(`room:${room}`);
//   });

//   socket.on("message", (data) => {
//     io.to(`room:${data.group}`).emit("messageBe", {
//       sender: data.name,
//       message: data.message,
//       date: moment().format("HH:mm"),
//     });
//     console.log(data);
//   });

//   socket.on("message", (data) => {
//     io.emit("messageBe", { message: data, date: moment().format("HH:mm") });
//     // socket.broadcast.emit("messageBe",{message: data, date: time})
//     console.log(data);
//   });

//   socket.on("disconnect", () => {
//     console.log(`user disconnect ${socket.id}`);
//   });
// });

// httpServer.listen(PORT, () => {
//   console.log(`app running on ${PORT}`);
// });
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
// app.use(morgan("dev"));
// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false,
//     crossOriginResourcePolicy: false,
//   })
// );
// app.use(xss());

// app.use(bodyParser.json());
// app.use("/", mainRouter);
// app.use("/img", express.static("./upload"));
// app.all("*", (req, res) => {
//   resp(res, 404, false, "404 Not Found");
// });
// app.get("/", (req, res) => {
//   res.status(200).json({ status: "success", statusCode: 200 });
// });

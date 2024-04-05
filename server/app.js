require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const { dbConnect } = require("./connection");
const { userRouter } = require("./routes/userRoutes");
const { chatRouter } = require("./routes/chatRoutes");
const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:5173"}))

// DB Connection
dbConnect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected".bgGreen.white);
  })
  .catch((e) => {
    console.log("DB Connection Failed".bgGreen.white + e);
  });

// Routes
app.use("/users", userRouter);
app.use("/chat", chatRouter); // Add chat routes

// Socket.IO connection
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

// Server Connection
server.listen(PORT, () => {
  console.log("SERVER IS RUNNING");
});

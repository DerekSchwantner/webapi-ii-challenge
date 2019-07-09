const express = require("express");
const Db = require("./data/db");

const server = express();

const postRoutes = require("./routes/postRoutes");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Tue July 9 WebAPI Challenge II");
});

server.use("/api/posts", postRoutes);

server.use();

const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));

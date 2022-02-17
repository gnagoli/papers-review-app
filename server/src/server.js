const http = require("http");
const { app } = require("./app");

const PORT = 3000 || process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listning on port ${PORT}...!`);
});

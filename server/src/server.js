const http = require("http");
const { app } = require("./app");

const { API_PORT } = process.env;

const PORT = API_PORT || process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listning on port ${PORT}...!`);
});

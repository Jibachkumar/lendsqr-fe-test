import jsonServer from "json-server";

const server = jsonServer.create();

const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

const port = 7000;

server.use(middlewares);

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server running on port ${port}`);
});

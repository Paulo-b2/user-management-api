import { fastify } from "fastify";
import { usersRoutes } from "./http/controllers/users/routes.js";

const app = fastify();

app.register(usersRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Servidor rodando!🚀");
  });

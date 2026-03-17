import "dotenv/config";
import { fastify } from "fastify";
import { usersRoutes } from "./http/controllers/users/routes.js";
import fastifyJwt from "@fastify/jwt";

const app = fastify();

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
});

app.register(usersRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Servidor rodando!🚀");
  });

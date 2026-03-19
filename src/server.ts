import "dotenv/config";
import { fastify } from "fastify";
import { usersRoutes } from "./http/controllers/users/routes.js";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

const app = fastify();

app.register(fastifyCookie);

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(usersRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Servidor rodando!🚀");
  });

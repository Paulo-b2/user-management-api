import type { FastifyInstance } from "fastify";
import { create } from "./create.js";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", create);
}

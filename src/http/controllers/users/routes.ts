import type { FastifyInstance } from "fastify";
import { create } from "./create.js";
import { getById } from "./get-by-id.js";

export async function usersRoutes(app: FastifyInstance) {
  app.get("/users/:id", getById);
  app.post("/users", create);
}

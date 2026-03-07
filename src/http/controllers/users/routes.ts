import type { FastifyInstance } from "fastify";
import { create } from "./create.js";
import { getById } from "./get-by-id.js";
import { list } from "./list.js";
import { deleteUser } from "./delete.js";
import { update } from "./update.js";
import { reactivate } from "./reactivate.js";

export async function usersRoutes(app: FastifyInstance) {
  app.get("/users", list);
  app.get("/users/:id", getById);
  app.post("/users", create);
  app.patch("/users/:id", update);
  app.delete("/users/:id", deleteUser);
  app.patch("/users/:id/reactivate", reactivate);
}

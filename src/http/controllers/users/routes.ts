import type { FastifyInstance } from "fastify";
import { create } from "./create.js";
import { getById } from "./get-by-id.js";
import { list } from "./list.js";
import { deleteUser } from "./delete.js";
import { update } from "./update.js";
import { reactivate } from "./reactivate.js";
import { getInactive } from "./list-inactive.js";

export async function usersRoutes(app: FastifyInstance) {
  app.get("/users", list);
  app.get("/users/:id", getById);
  app.get("/users/inactive", getInactive);

  app.post("/users", create);

  app.patch("/users/:id", update);
  app.patch("/users/:id/reactivate", reactivate);

  app.delete("/users/:id", deleteUser);
}

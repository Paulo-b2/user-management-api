import type { FastifyInstance } from "fastify";
import { create } from "./create.js";
import { getById } from "./get-by-id.js";
import { list } from "./list.js";
import { deleteUser } from "./delete.js";
import { update } from "./update.js";
import { reactivate } from "./reactivate.js";
import { getInactive } from "./list-inactive.js";
import { authenticate } from "./authenticate.js";
import { verifyJWT } from "../../middlewares/verify-jwt.js";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", create);
  app.post("/sessions", authenticate);

  // Authenticated
  app.get("/users", { onRequest: [verifyJWT] }, list);
  app.get("/users/:id", { onRequest: [verifyJWT] }, getById);
  app.get("/users/inactive", { onRequest: [verifyJWT] }, getInactive);

  app.patch("/users/:id", { onRequest: [verifyJWT] }, update);
  app.patch("/users/:id/reactivate", { onRequest: [verifyJWT] }, reactivate);

  app.delete("/users/:id", { onRequest: [verifyJWT] }, deleteUser);
}

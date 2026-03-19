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
import { refresh } from "./refresh.js";
import { verifyUserRole } from "../../middlewares/verify-user-role.js";
import { hardDelete } from "./hard-delete.js";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", create);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  // Authenticated
  app.get("/users", { onRequest: [verifyJWT] }, list);
  app.get("/users/:id", { onRequest: [verifyJWT] }, getById);
  app.get("/users/inactive", { onRequest: [verifyJWT] }, getInactive);

  app.patch("/users/:id", { onRequest: [verifyJWT] }, update);
  app.patch("/users/:id/reactivate", { onRequest: [verifyJWT, verifyUserRole("ADMIN")] }, reactivate);

  app.delete("/users/:id", { onRequest: [verifyJWT, verifyUserRole("ADMIN")] }, deleteUser);
  app.delete("/users/:id/permanent", {onRequest: [verifyJWT, verifyUserRole("ADMIN")]} ,hardDelete)
}

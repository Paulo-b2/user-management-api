import type { FastifyReply, FastifyRequest } from "fastify";
import { makeListUsersUseCase } from "../../../use-cases/factories/make-list-users-use-case.js";
import z from "zod";

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const page = listQuerySchema.parse(request.query);

  try {
    const listUseCase = makeListUsersUseCase();

    const users = await listUseCase.execute(page);

    return reply.status(200).send(users);
  } catch (error) {
    throw error;
  }
}

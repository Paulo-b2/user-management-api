import type { FastifyReply, FastifyRequest } from "fastify";
import { makeListInactiveUsersUseCase } from "../../../use-cases/factories/make-list-inactive-users-use-case.js";
import z from "zod";

export async function listInactive(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getInactiveQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getInactiveQuerySchema.parse(request.query);

  try {
    const listInactiveUsersUseCase = makeListInactiveUsersUseCase();

    const users = await listInactiveUsersUseCase.execute({ page });

    return reply.status(200).send(users);
  } catch (error) {
    throw error;
  }
}

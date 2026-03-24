import type { FastifyReply, FastifyRequest } from "fastify";
import { makeListUsersUseCase } from "../../../use-cases/factories/make-list-users-use-case.js";
import z from "zod";

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    name: z.string().optional(),
  });

  const { page, name } = listQuerySchema.parse(request.query);

  try {
    const listUseCase = makeListUsersUseCase();

    const { users } = await listUseCase.execute({ page, name });

    //ideal é remover o retorno da senha direto no prisma
    const usersWithoutPassword = users.map(
      ({ password_hash, ...user }) => user,
    );

    return reply.status(200).send(usersWithoutPassword);
  } catch (error) {
    throw error;
  }
}

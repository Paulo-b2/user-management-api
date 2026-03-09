import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetInactiveUsersUseCase } from "../../../use-cases/factories/make-get-inactive-users-use-case.js";

export async function getInactive(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const usersRepository = makeGetInactiveUsersUseCase();

    const users = await usersRepository.execute();

    return reply.status(200).send(users);
  } catch (error) {
    throw error;
  }
}

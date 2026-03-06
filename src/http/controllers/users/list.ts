import type { FastifyReply, FastifyRequest } from "fastify";
import { makeListUsersUseCase } from "../../../use-cases/factories/make-list-users-use-case.js";
import { ResourceNotFound } from "../../../use-cases/errors/resource-not-found-error.js";

export async function list(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listUseCase = makeListUsersUseCase();

    const users = await listUseCase.execute();

    return reply.status(200).send(users);
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}

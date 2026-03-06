import type { FastifyReply, FastifyRequest } from "fastify";
import { makeListUsersUseCase } from "../../../use-cases/factories/make-list-users-use-case.js";

export async function list(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listUseCase = makeListUsersUseCase();

    const users = await listUseCase.execute();

    return reply.status(200).send(users);
  } catch (error) {
    throw error;
  }
}

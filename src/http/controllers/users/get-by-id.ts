import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetUsersByIdUseCase } from "../../../use-cases/factories/make-get-user-by-id-use-case.js";
import { ResourceNotFound } from "../../../use-cases/errors/resource-not-found-error.js";

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const getByIdParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = getByIdParamsSchema.parse(request.params);

  try {
    const getUserByIdUseCase = makeGetUsersByIdUseCase();

    const user = await getUserByIdUseCase.execute({ id });

    return reply.status(200).send(user);
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}

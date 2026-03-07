import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteUserUseCase } from "../../../use-cases/factories/make-delete-user-use-case.js";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.js";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteUserParamsSchema.parse(request.params);

  try {
    const deleteUserUseCase = makeDeleteUserUseCase();

    await deleteUserUseCase.execute({ id });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}

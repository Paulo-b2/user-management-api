import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeHardDeleteUserUseCase } from "../../../use-cases/factories/make-hard-delete-user-use-case.js";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.js";

export async function hardDelete(request: FastifyRequest, reply: FastifyReply) {
  const hardDeleteParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = hardDeleteParamsSchema.parse(request.params);

  try {
    const hardDeleteUserUseCase = makeHardDeleteUserUseCase();
    await hardDeleteUserUseCase.execute({ id });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}

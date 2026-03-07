import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeReactivateUserUseCase } from "../../../use-cases/factories/make-reactivate-user-use-case.js";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.js";
import { UserAlreadyActiveError } from "../../../use-cases/errors/user-already-active-error.js";

export async function reactivate(request: FastifyRequest, reply: FastifyReply) {
  const reactivateParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = reactivateParamsSchema.parse(request.params);

  try {
    const reactivateUserUseCase = makeReactivateUserUseCase();

    const { user } = await reactivateUserUseCase.execute({ id });

    return reply.status(200).send({
      ...user,
      password_hash: undefined,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    if (error instanceof UserAlreadyActiveError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}

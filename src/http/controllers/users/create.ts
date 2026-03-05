import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateUseCase } from "../../../use-cases/factories/make-create-use-case.js";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error.js";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const { name, email, password } = createSchema.parse(request.body);

  try {
    const createUseCase = makeCreateUseCase();

    await createUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send();
}

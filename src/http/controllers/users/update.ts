import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateUserUseCase } from "../../../use-cases/factories/make-update-user-use-case.js";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error.js";
import { ResourceNotFound } from "../../../use-cases/errors/resource-not-found-error.js";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
    id: z.string(),
  });

  const updateBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().min(6).optional(),
  });

  const { id } = updateParamsSchema.parse(request.params);

  const { name, email, password } = updateBodySchema.parse(request.body);

  try {
    const updateUserUseCase = makeUpdateUserUseCase();

    let data: any = { id };

    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (password !== undefined) data.password = password;

    const user = await updateUserUseCase.execute(data);

    return reply.status(200).send(user);
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message });
    }
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}

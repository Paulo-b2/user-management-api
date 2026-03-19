import type { FastifyReply, FastifyRequest } from "fastify";
import z, { string } from "zod";
import { makeAuthenticateUseCase } from "../../../use-cases/factories/make-authenticate-use-case.js";
import { InvalidCretentialsError } from "../../../use-cases/errors/invalid-credentials-error.js";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      },
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true, // HTTPS
        sameSite: true, // cookie acessível apenas dentro do mesmo domínio
        httpOnly: true, // cookie acessível somente pelo backend
      })
      .status(200)
      .send({
        token,
      });
  } catch (error) {
    if (error instanceof InvalidCretentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}

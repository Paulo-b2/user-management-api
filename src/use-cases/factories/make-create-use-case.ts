import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { CreateUseCase } from "../create.js";

export function makeCreateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUseCase = new CreateUseCase(usersRepository);

  return createUseCase;
}

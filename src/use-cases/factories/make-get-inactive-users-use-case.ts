import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { GetInactiveUsersUseCase } from "../get-inactive-users.js";

export function makeGetInactiveUsersUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const getInactiveUsersUseCase = new GetInactiveUsersUseCase(usersRepository);

  return getInactiveUsersUseCase;
}

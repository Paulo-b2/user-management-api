import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { GetUserByIdUseCase } from "../get-user-by-id.js";

export function makeGetUsersByIdUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository);

  return getUserByIdUseCase;
}

import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { ReactivateUserUseCase } from "../reactivate-user.js";

export function makeReactivateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const reactivateUserUseCase = new ReactivateUserUseCase(usersRepository);

  return reactivateUserUseCase;
}

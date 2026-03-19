import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { HardDeleteUserUseCase } from "../hard-delete-user.js";

export function makeHardDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const hardDeleteUserUseCase = new HardDeleteUserUseCase(usersRepository);

  return hardDeleteUserUseCase;
}

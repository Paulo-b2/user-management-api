import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { ListUseCase } from "../list-users.js";

export function makeListUsersUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const listUseCase = new ListUseCase(usersRepository);

  return listUseCase;
}

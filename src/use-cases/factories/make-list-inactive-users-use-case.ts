import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { ListInactiveUsersUseCase } from "../list-inactive-users.js";

export function makeListInactiveUsersUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const listInactiveUsersUseCase = new ListInactiveUsersUseCase(
    usersRepository,
  );

  return listInactiveUsersUseCase;
}

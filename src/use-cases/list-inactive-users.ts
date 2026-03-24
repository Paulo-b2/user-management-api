import type { User } from "@prisma/client";
import type { UsersRepository } from "../repositories/users-repository.js";

interface ListInactiveUsersUseCaseRequest {
  page: number;
  name?: string | undefined;
}

interface ListInactiveUsersUseCaseResponse {
  users: User[];
}

export class ListInactiveUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
    name,
  }: ListInactiveUsersUseCaseRequest): Promise<ListInactiveUsersUseCaseResponse> {
    const users = await this.usersRepository.findAllInactive(page, name);

    return {
      users,
    };
  }
}

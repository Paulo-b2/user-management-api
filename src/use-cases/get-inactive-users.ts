import type { User } from "@prisma/client";
import type { UsersRepository } from "../repositories/users-repository.js";

interface GetInactiveUsersUseCaseResponse {
  users: User[];
}

export class GetInactiveUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<GetInactiveUsersUseCaseResponse> {
    const users = await this.usersRepository.findAllInactive();

    return {
      users,
    };
  }
}

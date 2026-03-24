import type { User } from "@prisma/client";
import type { UsersRepository } from "../repositories/users-repository.js";

interface ListUserByIdUseCaseRequest {
  page: number;
  name?: string | undefined;
}

interface ListUserByIdUseCaseResponse {
  users: User[];
}

export class ListUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
    name,
  }: ListUserByIdUseCaseRequest): Promise<ListUserByIdUseCaseResponse> {
    const users = await this.usersRepository.findAll(page, name);

    return {
      users,
    };
  }
}

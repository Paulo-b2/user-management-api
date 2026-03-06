import type { User } from "@prisma/client";
import type { UsersRepository } from "../repositories/users-repository.js";
import { ResourceNotFound } from "./errors/resource-not-found-error.js";

interface GetUserByIdUseCaseResponse {
  users: User[];
}

export class ListUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<GetUserByIdUseCaseResponse> {
    const users = await this.usersRepository.findAll();

    return {
      users,
    };
  }
}

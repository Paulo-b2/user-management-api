import type { User } from "@prisma/client";
import type { UsersRepository } from "../repositories/users-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface GetUserByIdUseCaseRequest {
  id: string;
}

interface GetUserByIdUseCaseResponse {
  user: User;
}

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}

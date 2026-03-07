import type { User } from "@prisma/client";
import type { UsersRepository } from "../repositories/users-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { UserAlreadyActiveError } from "./errors/user-already-active-error.js";

interface ReactivateUserUseCaseRequest {
  id: string;
}

interface ReactivateUserUseCaseResponse {
  user: User;
}

export class ReactivateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: ReactivateUserUseCaseRequest): Promise<ReactivateUserUseCaseResponse> {
    const user = await this.usersRepository.findByIdIncludingInactive(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    if (user.isActive) {
      throw new UserAlreadyActiveError();
    }

    const userReactivate = await this.usersRepository.reactivate(id);

    return {
      user: userReactivate,
    };
  }
}

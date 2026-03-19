import type { UsersRepository } from "../repositories/users-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface HardDeleteUserUseCaseRequest {
  id: string;
}

export class HardDeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: HardDeleteUserUseCaseRequest) {
    const user = await this.usersRepository.findByIdIncludingInactive(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    await this.usersRepository.hardDelete(id);
  }
}

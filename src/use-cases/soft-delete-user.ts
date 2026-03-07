import type { UsersRepository } from "../repositories/users-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface DeleteUserUseCaseRequest {
  id: string;
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    await this.usersRepository.delete(id);
  }
}

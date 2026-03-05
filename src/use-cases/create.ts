import type { User } from "@prisma/client";
import type { UsersRepository } from "../repositories/users-repository.js";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";

interface CreateUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUseCaseResponse {
  user: User;
}

export class CreateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}

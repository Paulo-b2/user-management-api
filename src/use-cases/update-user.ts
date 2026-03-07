import type { User } from "@prisma/client";
import type {
  UpdateUserData,
  UsersRepository,
} from "../repositories/users-repository.js";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";

interface UpdateUserUseCaseRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

interface UpdateUserUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    email,
    name,
    password,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    let password_hash: string | undefined;

    if (password) {
      password_hash = await hash(password, 6);
    }

    const data: UpdateUserData = { id };

    if (name) data.name = name;

    //pode evitar uma consulta a mais no banco se o email passado for igual ao que já está no banco
    if (email !== user.email && email !== undefined) {
      const userWithSameEmail = await this.usersRepository.findByEmail(email);

      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new UserAlreadyExistsError();
      }

      data.email = email;
    }

    if (password_hash) data.password_hash = password_hash;

    const updatedUser = await this.usersRepository.update(data);

    return {
      user: updatedUser,
    };
  }
}

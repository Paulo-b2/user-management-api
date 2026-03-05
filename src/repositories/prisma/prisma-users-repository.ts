import type { Prisma } from "@prisma/client";
import type { UsersRepository } from "../users-repository.js";
import { getPrisma } from "../../lib/prisma.js";

export class PrismaUsersRepository implements UsersRepository {
  private prisma = getPrisma();

  findByEmail(email: string) {
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  create(data: Prisma.UserCreateInput) {
    const user = this.prisma.user.create({
      data,
    });

    return user;
  }
}

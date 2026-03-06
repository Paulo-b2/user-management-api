import type { Prisma } from "@prisma/client";
import type { UsersRepository } from "../users-repository.js";
import { getPrisma } from "../../lib/prisma.js";

export class PrismaUsersRepository implements UsersRepository {
  private prisma = getPrisma();

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: {
        isActive: true,
      },
    });

    return users;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user?.isActive) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        isActive: true,
      },
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }
}

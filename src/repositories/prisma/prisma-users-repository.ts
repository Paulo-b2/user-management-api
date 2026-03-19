import type { Prisma } from "@prisma/client";
import type { UpdateUserData, UsersRepository } from "../users-repository.js";
import { getPrisma } from "../../lib/prisma.js";

export class PrismaUsersRepository implements UsersRepository {
  private prisma = getPrisma();

  async findAll(page: number) {
    const LIMIT = 20;

    const users = await this.prisma.user.findMany({
      where: {
        isActive: true,
      },
      take: LIMIT,
      skip: (page - 1) * LIMIT,
      orderBy: { createdAt: "desc" },
    });

    return users;
  }

  findAllInactive(page: number) {
    const LIMIT = 20;
    const users = this.prisma.user.findMany({
      where: {
        isActive: false,
      },
      take: LIMIT,
      skip: (page - 1) * LIMIT,
      orderBy: { createdAt: "desc" },
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
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        //estou buscando usuário ativo ou inativo
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

  async update(data: UpdateUserData) {
    const user = await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });

    return user;
  }

  async softDelete(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }

  async hardDelete(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async findByIdIncludingInactive(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async reactivate(id: string) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    });

    return user;
  }
}

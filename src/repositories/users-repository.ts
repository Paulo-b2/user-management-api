import type { Prisma, User } from "@prisma/client";

export interface UpdateUserData {
  id: string;
  name?: string;
  email?: string;
  password_hash?: string;
}

export interface UsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAllInactive(): Promise<User[]>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(data: UpdateUserData): Promise<User>;
  softDelete(id: string): Promise<void>;
  hardDelete(id:string): Promise<void>
  findByIdIncludingInactive(id: string): Promise<User | null>;
  reactivate(id: string): Promise<User>;
}

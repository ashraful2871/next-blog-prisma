import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });
  //   console.log(payload);
  return createdUser;
};
const getAllFromDb = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      status: true,
      IsVerified: true,
      createdAt: true,
      updatedAt: true,
      post: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //   console.log(payload);
  return result;
};

const getUserById = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      status: true,
      IsVerified: true,
      createdAt: true,
      updatedAt: true,
      post: true,
    },
  });
  //   console.log(payload);
  return result;
};

export const userService = { createUser, getAllFromDb, getUserById };

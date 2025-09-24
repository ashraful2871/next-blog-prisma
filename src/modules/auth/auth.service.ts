import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const loginWithEmailAndPAssword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("user Not found");
  }

  if (password === user.password) {
    return user;
  } else {
    throw new Error("incorrect password");
  }
};
const authWithGoogle = async (data: Prisma.UserCreateInput) => {
  let user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    user = await prisma.user.create({
      data,
    });
  }
  return user;
};

export const authServices = { loginWithEmailAndPAssword, authWithGoogle };

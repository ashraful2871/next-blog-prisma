import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const loginWithEmailAndPAssword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
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

export const authServices = { loginWithEmailAndPAssword };

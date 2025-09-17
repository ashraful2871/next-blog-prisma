import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const createdPost = await prisma.post.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  //   console.log(payload);
  return createdPost;
};

const getAllPost = async ({
  page = 1,
  limit = 10,
  search,
  IsFeatured,
}: {
  page?: number;
  limit?: number;
  search?: string;
  IsFeatured?: boolean;
}) => {
  const skip = (page - 1) * page;
  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      typeof IsFeatured === "boolean" && { IsFeatured },
    ].filter(Boolean),
  };
  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
  });
  //   console.log(payload);
  return result;
};

const getPostById = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });
  //   console.log(payload);
  return result;
};
const deletePost = async (id: number) => {
  const result = await prisma.post.delete({
    where: { id },
  });
  //   console.log(payload);
  return result;
};

const updatePost = async (id: number, data: Partial<any>) => {
  const result = await prisma.post.update({
    where: { id },
    data,
  });
  //   console.log(payload);
  return result;
};

export const postService = {
  createPost,
  getAllPost,
  getPostById,
  deletePost,
  updatePost,
};

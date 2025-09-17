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
  tags,
}: {
  page?: number;
  limit?: number;
  search?: string;
  IsFeatured?: boolean;
  tags?: string[];
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
      tags && tags.length > 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };
  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  const total = await prisma.post.count({ where });
  return {
    data: result,
    pagination: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
  };
};

const getPostById = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return await tx.post.findUnique({
      where: { id },
      include: { author: true },
    });
  });
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
const getBlogStat = async () => {
  return await prisma.$transaction(async (tx) => {
    const aggregate = await tx.post.aggregate({
      _count: true,
      _sum: { views: true },
      _avg: { views: true },
      _max: { views: true },
      _min: { views: true },
    });

    const featuredCount = await tx.post.count({
      where: {
        IsFeatured: true,
      },
    });

    const topFeatured = await tx.post.findFirst({
      where: {
        IsFeatured: true,
      },
      orderBy: {
        views: "desc",
      },
    });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastWeekPostCount = await tx.post.count({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    });
    return {
      stats: {
        totalPosts: aggregate._count ?? 0,
        totalVie: aggregate._sum.views ?? 0,
        averageViews: aggregate._avg.views ?? 0,
        minViews: aggregate._min.views ?? 0,
        maxViews: aggregate._max.views ?? 0,
      },
      featured: {
        count: featuredCount,
      },
      topPosts: {
        topFeatured,
      },
      lastWeekPostCount,
    };
  });
};

export const postService = {
  createPost,
  getAllPost,
  getPostById,
  deletePost,
  updatePost,
  getBlogStat,
};

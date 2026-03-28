import prismaService from "@/lib/prismaService";

export interface CreateBlogProps {
    title: string;
    slug: string;
    thumbnail: string;
    description: string;
    blogHashtags: string[];
    content: string;
}

export interface UpdateBlogProps {
    title: string;
    slug: string;
    thumbnail: string | null;
    description: string | null;
    blogHashtags: string[];
    content: string;
    status?: string | null;
}

const DEFAULT_TAGS = ["vesmart", "robothutbui", "suachuadanang"] as const;

function normalizeHashtags(input: string[]): string[] {
    const merged = [...input.map((t) => t.trim()).filter(Boolean), ...DEFAULT_TAGS];
    return Array.from(new Set(merged.map((t) => t.toLowerCase())));
}

function hashtagCreates(names: string[]) {
    return names.map((name) => ({
        Hashtag: {
            connectOrCreate: {
                where: { name },
                create: { name },
            },
        },
    }));
}

class BlogService {
    async createBlog(userId: string, body: CreateBlogProps): Promise<any> {
        try {
            const { title, slug, thumbnail, blogHashtags = [], description, content } = body;

            if (!slug || !title || !content) {
                throw Error("Data not found");
            }

            const tags = normalizeHashtags(blogHashtags);
            const creates = hashtagCreates(tags.length ? tags : [...DEFAULT_TAGS]);

            const newBlog = await prismaService.blog.create({
                data: {
                    slug: slug,
                    title: title,
                    thumbnail: thumbnail || "",
                    author: {
                        connect: {
                            id: userId,
                        },
                    },
                    status: null,
                    description: description || null,
                    content: content,
                    blogHashtags: {
                        create: creates,
                    },
                },
            });

            return {
                success: true,
                message: "Create blogs successful",
                blog: newBlog,
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error,
            };
        }
    }

    async findAll(query: { page?: number; limit?: number }) {
        const page = Math.max(1, Number(query.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
        const skip = (page - 1) * limit;

        try {
            const [blogs, total] = await Promise.all([
                prismaService.blog.findMany({
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        thumbnail: true,
                        author: {
                            select: {
                                id: true,
                                fullName: true,
                                username: true,
                                email: true,
                            },
                        },
                        status: true,
                        description: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                    orderBy: {
                        updatedAt: "desc",
                    },
                    take: limit,
                    skip,
                }),
                prismaService.blog.count(),
            ]);

            const totalPages = Math.max(1, Math.ceil(total / limit));

            return {
                success: true,
                message: "Get blogs successful",
                blogs,
                total,
                page,
                limit,
                totalPages,
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error,
            };
        }
    }

    async findAllAdmin(query: { page?: number; limit?: number }) {
        const page = Math.max(1, Number(query.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(query.limit) || 50));
        const skip = (page - 1) * limit;

        try {
            const [blogs, total] = await Promise.all([
                prismaService.blog.findMany({
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        updatedAt: true,
                        createdAt: true,
                    },
                    orderBy: { updatedAt: "desc" },
                    take: limit,
                    skip,
                }),
                prismaService.blog.count(),
            ]);

            return {
                success: true,
                blogs,
                total,
                page,
                limit,
                totalPages: Math.max(1, Math.ceil(total / limit)),
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error,
            };
        }
    }

    async findOne(slug: string) {
        try {
            const blog = await prismaService.blog.findFirst({
                where: {
                    slug: slug,
                },
                include: {
                    blogHashtags: {
                        include: {
                            Hashtag: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                    author: {
                        select: {
                            id: true,
                            fullName: true,
                            username: true,
                            email: true,
                        },
                    },
                },
            });

            return {
                success: true,
                message: "Get blog successful",
                blog: blog,
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error,
            };
        }
    }

    async findById(id: string) {
        try {
            const blog = await prismaService.blog.findUnique({
                where: { id },
                include: {
                    blogHashtags: {
                        include: {
                            Hashtag: {
                                select: { id: true, name: true },
                            },
                        },
                    },
                    author: {
                        select: {
                            id: true,
                            fullName: true,
                            username: true,
                            email: true,
                        },
                    },
                },
            });

            if (!blog) {
                return {
                    success: false,
                    message: "Blog not found",
                    blog: null,
                };
            }

            return {
                success: true,
                message: "Get blog successful",
                blog,
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error,
            };
        }
    }

    async updateBlog(id: string, body: UpdateBlogProps) {
        try {
            const { title, slug, thumbnail, description, content, status, blogHashtags = [] } = body;

            if (!slug || !title || !content) {
                throw Error("Data not found");
            }

            const tags = normalizeHashtags(blogHashtags);
            const creates = hashtagCreates(tags);

            await prismaService.blogHashtag.deleteMany({
                where: { blogId: id },
            });

            const blogUpdate = await prismaService.blog.update({
                where: { id },
                data: {
                    title,
                    slug,
                    thumbnail: thumbnail ?? "",
                    description: description ?? null,
                    content,
                    status: status ?? undefined,
                    blogHashtags: {
                        create: creates,
                    },
                },
            });

            return {
                success: true,
                message: "Update blog successful",
                blog: blogUpdate,
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error,
            };
        }
    }

    async update(id: string, data: any) {
        try {
            const blogUpdate = await prismaService.blog.update({
                where: {
                    id: id,
                },
                data: {
                    ...data,
                },
            });

            return {
                success: true,
                message: "Update blog successful",
                blog: blogUpdate,
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error,
            };
        }
    }

    async fullSeo() {
        try {
            const blogs = await prismaService.blog.findMany({
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    thumbnail: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: {
                    updatedAt: "desc",
                },
            });

            return {
                success: true,
                message: "Get blogs successful",
                blogs: blogs,
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error,
            };
        }
    }
}

const blogService = new BlogService();

export default blogService;

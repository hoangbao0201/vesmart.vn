import prismaService from "@/lib/prismaService";

export interface CreateBlogProps {
    title: string
    slug: string
    thumbnail: string
    description: string
    blogHashtags: string[]
    content: string
}

class BlogService {

    async createBlog(userId: string, body: CreateBlogProps) : Promise<any> {
        try {
            // const { title, slug, thumbnail = "", description = "", blogHashtags = ["VESMART"], content } = body;
            const { title, slug, thumbnail, blogHashtags = [], description, content } = body;

            if(!slug || !title || !content) {
                throw Error("Data not found");
            }

            blogHashtags.push("vesmart", "robothutbui", "suachuadanang");

            const newBlog = await prismaService.blog.create({
                data: {
                    slug: slug,
                    title: title,
                    thumbnail: thumbnail,

                    author: {
                        connect: {
                            id: userId
                        }
                    },
                    status: null,
                    description: description || null,

                    content: content,
                    
                    blogHashtags: {
                        create: [
                            {
                                Hashtag: {
                                    connectOrCreate: {
                                        where: {
                                            name: blogHashtags[0],
                                        },
                                        create: {
                                            name: blogHashtags[0]
                                        }
                                    }
                                }
                            },
                            {
                                Hashtag: {
                                    connectOrCreate: {
                                        where: {
                                            name: blogHashtags[1],
                                        },
                                        create: {
                                            name: blogHashtags[1]
                                        }
                                    }
                                }
                            },
                            {
                                Hashtag: {
                                    connectOrCreate: {
                                        where: {
                                            name: blogHashtags[2],
                                        },
                                        create: {
                                            name: blogHashtags[2]
                                        }
                                    }
                                }
                            },
                        ]
                    }
                }
            })

            return {
                success: true,
                message: "Create blogs successful",
                blog: newBlog
                // blog: {
                //     ...body,
                //     userId,
                //     blogHashtags
                // }
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error
            };
        }
    
    }

    async findAll(query: any) {
        const { page = 0, limit = 10 } = query;

        try {
            const blogs = await prismaService.blog.findMany({
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
                            email: true
                        }
                    },
                    status: true,
                    description: true,
                    createdAt: true,
                    // updatedAt: true
                },
                orderBy: {
                    updatedAt: "desc"
                },
                take: Number(limit) || 10,
                skip: Number(page) ? (page-1)*limit : 0
            });
        
            return {
                success: true,
                message: "Get blogs successful",
                blogs: blogs
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error
            };
        }
    }

    async findOne(slug: string) {
        try {
            const blog = await prismaService.blog.findFirst({
                where: {
                    slug: slug
                },
                include: {
                    blogHashtags: {
                        include: {
                            Hashtag: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    },
                    author: {
                        select: {
                            id: true,
                            fullName: true,
                            username: true,
                            email: true
                        }
                    }
                }
            })

            return {
                success: true,
                message: "Get blog successful",
                blog: blog
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error
            };
        }
    }

    async update(id: string, data: any) {
        try {
            const blogUpdate = await prismaService.blog.update({
                where: {
                    id: id
                },
                data: {
                    ...data
                }
            })
    
            return {
                success: true,
                message: "Update blog successful",
                blog: blogUpdate
            }
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error
            };
        }
    }






    // ----------- FULL BLOG SEO -----------------
    async fullSeo() {
        try {
            const blogs = await prismaService.blog.findMany({
                select: {
                    id: true,
                    slug: true,
                    createdAt: true,
                    updatedAt: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        
            return {
                success: true,
                message: "Get blogs successful",
                blogs: blogs
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error
            };
        }
    }
}

const blogService = new BlogService();

export default blogService;
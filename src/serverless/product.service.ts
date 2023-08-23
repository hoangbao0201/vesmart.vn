import prismaService from "@/lib/prismaService";
import { BlogTypes } from "@/types";

class ProductService {

    async createBlog(userId: string, body: BlogTypes) : Promise<any> {
        try {
            const { slug, title, thumbnail, description, content } = body;

            const blogHashtags = ["vesmart", "robothutbui", "suachuadanang"];

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
                        create: blogHashtags.map(tag => (
                            {
                                Hashtag: {
                                    connectOrCreate: {
                                        where: {
                                            name: tag,
                                        },
                                        create: {
                                            name: tag
                                        }
                                    }
                                }
                            }
                        ))
                    }
                }
            })

            // delete newBlog.content

            return {
                success: true,
                message: "Create blogs successful",
                // blog: newBlog
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
        try {

            const { page = 0, limit = 10 } = query;

            const products = await prismaService.product.findMany({
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    brand: true,
                    images: {
                        take: 1,
                    },
                    price: true,
                    stock: true,
                    rating: true,
                    description: true,
                    createdAt: true,
                    updatedAt: true    
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: Number(limit) || 10,
                skip: Number(page) ? (page-1)*limit : 0
            });
        
            return {
                success: true,
                message: "Get products successful",
                products: products
            };
        } catch (error) {
            return {
                success: false,
                message: "error products successful",
                error: error
            };
        }
    }

    async findOne(slug: string) {
        try {
            const product = await prismaService.product.findFirst({
                where: {
                    slug: slug
                },
                include: {
                    productDetail: {
                        include: {
                            productInformationItems: true
                        }
                    }
                }
            })

            return {
                success: true,
                message: "Get product successful",
                product: product
            };
        } catch (error) {
            return {
                success: false,
                message: "error product successful",
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






    // // ----------- FULL BLOG SEO -----------------
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

const productService = new ProductService();

export default productService;
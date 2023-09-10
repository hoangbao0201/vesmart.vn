import prismaService from "@/lib/prismaService";
import { BlogTypes, OrderTypes } from "@/types";

class OrderService {

    async createOrder(body: OrderTypes) : Promise<any> {
        try {
            const { name, phone, adress, code, description, productsOrder } = body;

            const newBlog = await prismaService.order.create({
                data: {
                    name: name, 
                    phone: phone, 
                    adress: adress, 
                    code: code, 
                    description: description, 
                    productsOrder: productsOrder
                }
            })

            // delete newBlog.content

            return {
                success: true,
                message: "Create blogs successful",
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
            const orders = await prismaService.order.findMany({
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    code: true,
                    adress: true,
                    description: true,
                    createdAt: true,
                    updatedAt: true,
                    productsOrder: true
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: Number(limit) || 10,
                skip: Number(page) ? (page-1)*limit : 0
            });
        
            return {
                success: true,
                message: "Get orders successful",
                orders: orders || []
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

    async delete(id: string) {
        try {
            const orderDel = await prismaService.order.delete({
                where: {
                    id: id
                },
            })
    
            return {
                success: true,
                message: "Delete order successful",
                order: orderDel
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

const orderService = new OrderService();

export default orderService;
import prismaService from "@/lib/prismaService";
import { BlogTypes, OrderTypes } from "@/types";
import productService from "./product.service";

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

            const prOrder = JSON.parse(productsOrder);
            if(prOrder.length > 0) {

                console.log("prOrder: ", prOrder);

                for(let i=1; i<=prOrder.length; i++) {
                    const updateStock = await productService.reduceStock(prOrder[0].skuId, prOrder[0].count);
                    console.log("updateStock " + i + ": " + updateStock);
                }
            }

            //console.log(prOrder[0]);

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

    async findOne(id: string) {
        try {
            const order = await prismaService.order.findFirst({
                where: {
                    id: id
                },
            })

            return {
                success: true,
                message: "Get order successful",
                order: order
            };
        } catch (error) {
            return {
                success: false,
                message: "error order successful",
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
}

const orderService = new OrderService();

export default orderService;
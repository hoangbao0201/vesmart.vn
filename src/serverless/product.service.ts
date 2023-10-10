import prismaService from "@/lib/prismaService";
import { BlogTypes, ProductInformationItem, ProductTypes } from "@/types";

class ProductService {

    async createProduct(body: ProductTypes & { productInformationItems: ProductInformationItem[] }) : Promise<any> {
        try {
            const { slug, title, brand, description, images, variants, skus, productInformationItems } = body;

            const newProduct = await prismaService.product.create({
                data: {
                    title: title,
                    slug: slug,
                    brand: brand,
                    description: description,
                    productDetail: {
                        create: {
                            productInformationItems: {
                                create: productInformationItems
                            }
                        }
                    },
                    images: {
                        create: images
                    },
                    variants: {
                        create: variants.map(variant => {
                            return ({
                                name: variant.name,
                                position: variant.position,
                                subVariants: {
                                    create: variant.subVariants?.map(subVariant => {
                                        return ({
                                            name: subVariant.name,
                                            position: subVariant.position
                                        })
                                    })
                                }
                            })
                        })
                    },
                    skus: {
                        create: skus.map(skuPr => {
                            return ({
                                sku: skuPr.sku,
                                stock: skuPr.stock,
                                price: skuPr.price,
                            })
                        })
                    },

                }
            });

            return {
                success: true,
                message: 'Create product successful',
                product: newProduct
            };
        } catch (error) {
            return {
                success: false,
                message: "error product successful",
                error: error
            };
        }
    
    }

    async findAll(query: any) {
        try {

            const { page = 0, limit = 10 } = query;

            const products = await prismaService.product.findMany({
                // select: {
                //     id: true,
                //     slug: true,
                //     title: true,
                //     brand: true,
                //     images: {
                //         take: 1,
                //     },
                //     rating: true,
                //     description: true,
                //     createdAt: true,
                //     updatedAt: true,
                // },
                include: {
                    images: {
                        select: {
                            url: true
                        },
                        take: 1
                    },
                    skus: true
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
                    variants: {
                        select: {
                            id: true,
                            position: true,
                            name: true,
                            subVariants: {
                                select: {
                                    id: true,
                                    position: true,
                                    name: true
                                }
                            }
                        }
                    },
                    skus: true,
                    images: true,
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

    async reduceStock(id: string, count: number) {
        try {
            const currentSKU = await prismaService.sKU.findUnique({
                where: {
                    id: id
                }
            });
    
            if (!currentSKU) {
                return {
                    success: false,
                    message: "SKU not found"
                };
            }
    
            // Tính toán stock mới
            const newStock = currentSKU.stock - count;
    
            // Cập nhật stock mới vào cơ sở dữ liệu
            const productUpdate = await prismaService.sKU.update({
                where: {
                    id: id
                },
                data: {
                    stock: newStock
                }
            });
    
            return {
                success: true,
                message: "Update product successful",
                product: productUpdate
            }
        } catch (error) {
            return {
                success: false,
                message: "error product successful",
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
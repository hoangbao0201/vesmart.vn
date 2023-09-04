export interface UserTypes {
    id: string;

    fullName: string;
    username: string;
    email: string;
    password: string;

    level: number;
    avatarUrl: string;

    createdAt: Date;
    updatedAt: Date;
}

// Blog
export interface BlogTypes {
    id: string;

    slug: string;
    title: string;
    thumbnail: string;

    status: string;
    description: string;

    content: string;

    createdAt: Date;
    updatedAt: Date;

    authorId: String;
    author: Partial<UserTypes>;

    blogHashtags?: BlogHashtagType[]
}

interface BlogHashtagType {
    id: string
    Hashtag: HashtagType
}

interface HashtagType {
    id: string
    name: string
}

// Product
export interface ProductTypes {
    id: string
    slug: string
    title: string
    description: string
    brand: string
    rating: number
    images: ImageTypes[]
    createdAt: Date
    updatedAt: Date

    productDetail?: ProductDetailTypes
    variants: VariantTypes[]
    skus: SKUTypes[]

}

interface VariantTypes {
    id: string
    position: string
    name: string
    productId: string
    product: string
    subVariants?: SubVariantTypes[]
}
  
interface SubVariantTypes {
    id: string
    position: string
    name: string
    variantId: string
    variant: string
    skus: SKUSubVariantTypes[]
}
  
interface SKUTypes {
    id: string   
    price: number  
    sku: string
    stock: number 
    
    productId: string
    product: ProductTypes
    subVariants: SKUSubVariantTypes[]
}
  
interface SKUSubVariantTypes {
    id: string

    skuId: string   
    sku: SKUTypes
    subVariantId: string 
    subVariant: SubVariantTypes
}

interface ProductDetailTypes {
    id: string
    productInformationItems: ProductInformationItem[]
}

interface ProductInformationItem {
    id: string
    name: string
    value: string
}

export interface ImageTypes {
    id: string
    url: string
    publicId: string
}

export interface OrderTypes {
    id: string
    name: string
    phone: string
    adress: string
    code?: string
    description?: string
    createdAt: Date
    updatedAt: Date
  
    products?: ProductTypes[]
}
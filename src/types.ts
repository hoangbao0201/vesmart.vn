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
    id: string;
    title: string;
    description: string;
    brand: string;
    rating: number;
    images: ImageTypes[];
    createdAt: Date;
    updatedAt: Date;

    price?: number;
    stock?: number;
}

export interface ImageTypes {
    id: string;
    url: string;
    publicId: string;
}

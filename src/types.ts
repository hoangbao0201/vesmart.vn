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
    author: Partial<UserTypes>
}

import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import MarkContent from "@/components/share/MarkContent";
import { SITE_CONFIG } from "@/configs/site.config";
import { IGetPostDetail } from "@/services/post/post.type";
import { tagNameToSlug } from "@/utils/tagSlug";
import Image from "next/image";
import Link from "next/link";

interface PostDetailTemplateProps {
    post: IGetPostDetail;
}
const PostDetailTemplate = ({ post }: PostDetailTemplateProps) => {
    return (
        <div className="py-4 container mx-auto max-w-7xl min-h-screen">
            <BreadcrumbNav
                className="mb-4 px-3"
                items={[
                    { name: "Trang chủ", path: "/" },
                    { name: "Bài viết", path: "/bai-viet" },
                    { name: post.title },
                ]}
            />
            <div className="lg:flex">
                <div className="lg:w-8/12 md:px-3 mb-5">
                    <div className="md:px-14 px-3 py-10 bg-white border border-gray-200/80 md:rounded-lg min-h-screen">
                        <article>
                            <header>
                                <h1 title={post?.title} className="font-bold md:text-3xl text-2xl text-blue-950 mb-7 leading-[1.5] capitalize">
                                    {post?.title}
                                </h1>
                                <ul className="flex flex-wrap mb-4 -mx-2">
                                    {
                                        post?.tags && post?.tags.map((tag, index) => {
                                            const slug = tagNameToSlug(tag.name);
                                            if (!slug) {
                                                return null;
                                            }
                                            return (
                                                <li className="" key={tag.name}>
                                                    <Link
                                                        href={`/the-loai/${tagNameToSlug(tag.name)}`}
                                                        className={`px-2 py-[2px] text-lg font-semibold border border-transparent dev-tag-blog-${index}`}
                                                    >
                                                        <span style={{ color: `var(--tag-color-${index})` }} className={`mr-px`}>#</span>{tag.name}
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <p className="mb-3 prose">{post?.description}</p>
                            </header>

                            <MarkContent>
                                {post?.content}
                            </MarkContent>

                            <div className="mt-10 px-4 py-2 bg-gray-100 border border-gray-200/80 rounded-lg">
                                <h2 className="font-bold text-lg text-blue-950 mb-3">
                                    Thông tin
                                </h2>
                                <div className="space-y-2">
                                    <p>
                                        <strong className="text-sm">Địa chỉ:</strong> {SITE_CONFIG.address}
                                    </p>
                                    <p>
                                        <strong className="text-sm">Số điện thoại:</strong> <Link
                                            href={`tel:${SITE_CONFIG.phone}`}
                                            target="_blank"
                                            title={SITE_CONFIG.phone}
                                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                            className="text-blue-600 hover:text-blue-700 break-words whitespace-pre-wrap"
                                        >
                                            {SITE_CONFIG.phone}
                                        </Link>
                                    </p>
                                    <p>
                                        <strong className="text-sm">Facebook:</strong> <Link href={`${SITE_CONFIG.facebook}`}
                                            target="_blank"
                                            title={SITE_CONFIG.facebook}
                                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                            className="text-blue-600 hover:text-blue-700 break-words whitespace-pre-wrap"
                                        >
                                            @suachuarobothutbui
                                        </Link>
                                    </p>

                                    <p>
                                        <strong className="text-sm">Website:</strong> <Link
                                            href={`${SITE_CONFIG.url}`}
                                            target="_blank"
                                            title={SITE_CONFIG.url}
                                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                            className="text-blue-600 hover:text-blue-700 break-words whitespace-pre-wrap"
                                        >
                                            {SITE_CONFIG.url.replace('https://', '@')}
                                        </Link>
                                    </p>
                                    <p>
                                        <strong className="text-sm">Tiktok:</strong> <Link
                                            href={`${SITE_CONFIG.tiktok}`}
                                            target="_blank"
                                            title={SITE_CONFIG.tiktok}
                                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                            className="text-blue-600 hover:text-blue-700 break-words whitespace-pre-wrap"
                                        >
                                            {SITE_CONFIG.tiktok.replace('https://tiktok.com/', '')}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>

                </div>
                <aside className="lg:w-4/12 md:px-3 mb-5 min-h-full top-0 bottom-0" aria-label="Liên hệ VESMART">
                    <div className="sticky top-[40px] bg-white border border-gray-200/80 rounded-lg">

                        <div className="relative flex flex-col min-h-[200px] px-4 py-4">
                            <h2 className="mb-3 font-extrabold text-lg text-blue-950">Liên hệ VESMART</h2>
                            <p className="mb-1 text-gray-700">Liên hệ ngay để được tư vấn và sửa chữa</p>
                            <Image
                                unoptimized
                                width={1000}
                                height={1000}
                                alt="Quét mã hoặc liên hệ Zalo VESMART - tư vấn sửa chữa robot hút bụi"
                                loading="lazy"
                                className="w-full"
                                src={'/static/images/zalo-profile.jpg'}
                            />
                            <Link target="_blank" href={'https://zalo.me/0971183153'} className="bg-blue-600 rounded-md w-full py-2 text-center text-white hover:bg-blue-700 transition-all block mt-auto">Liên hệ ngay</Link>
                        </div>

                    </div>
                </aside>
            </div>
        </div>
    )
}

export default PostDetailTemplate;
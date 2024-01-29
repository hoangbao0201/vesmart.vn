import Link from "next/link";
import { IconChevronsRight } from "../../../public/static/icons/IconSvg";

type ItemPathType = {
    title: string;
    url: string;
};
interface BreadcrumbProps {
    path: ItemPathType[];
}

const Breadcrumb = ({ path }: BreadcrumbProps) => {
    return (
        <div className="flex items-center bg-white border shadow-sm rounded-md md:px-3 py-2 my-2">
            <ol
                itemScope
                itemType="http://schema.org/BreadcrumbList"
                className="flex items-center flex-nowrap gap-2 px-4 py-2 [&>li]:whitespace-nowrap overflow-x-auto"
            >
                <li
                    itemScope
                    itemProp="itemListElement"
                    itemType="http://schema.org/ListItem"
                    className="text-gray-600 hover:underline"
                >
                    <Link
                        id="0"
                        itemScope 
                        itemProp="item"
                        itemType="http://schema.org/Thing"
                        href="/"
                    >
                        <span itemProp="name">VESMART</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                </li>
                {path.length > 0 && (
                    <>
                        {path.map((item, index) => {
                            return (
                                <li 
                                    key={index}
                                    itemScope
                                    itemProp="itemListElement"
                                    itemType="http://schema.org/ListItem"
                                    className="text-gray-600 hover:underline clear-left flex items-center"
                                >
                                    {/* <i className="mr-2 inline-block flex-shrink"> */}
                                        <IconChevronsRight className="w-4 h-4 mr-2"/>
                                    {/* </i> */}

                                    <Link
                                        id={`${index+1}`}
                                        itemScope 
                                        itemProp="item"
                                        itemType="http://schema.org/Thing"
                                        href={item.url}
                                    >
                                        <span itemProp="name">{item.title}</span>
                                    </Link>
                                    <meta itemProp="position" content={String(index+2)} />
                                </li>
                            );
                        })}
                    </>
                )}
            </ol>
        </div>
    );
};

export default Breadcrumb;
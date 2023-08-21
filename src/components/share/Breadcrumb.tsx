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
        <div className="flex items-center border-l-4 border-l-blue-500 mr-3 mb-7">
            <ol
                itemScope
                itemType="http://schema.org/BreadcrumbList"
                className="flex items-center flex-wrap gap-2 px-4"
            >
                <li
                    itemScope
                    itemProp="itemListElement"
                    itemType="http://schema.org/ListItem"
                    className="text-blue-500"
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
                                    className="text-blue-500 clear-left flex items-center"
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
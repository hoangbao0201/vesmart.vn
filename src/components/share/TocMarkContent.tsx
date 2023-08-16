import useHeadingsData from "@/hook/useHeadingData";
import { NestedHeading } from "@/utils/getNestedHeading";
import { ReactNode } from "react";


interface TocMarkContentProps {
    children?: ReactNode;
}

const TocMarkContent = ({ children }: TocMarkContentProps) => {
    const { nestedHeadings } = useHeadingsData();

    return (
        <div className="">
            <ul>
                {
                    nestedHeadings.map((heading) => (
                        <li key={heading.id}>
                            <a href={`#${heading.id}`}>{heading.title}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
export default TocMarkContent;

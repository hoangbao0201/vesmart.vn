import { useEffect, useState } from "react";

import getNestedHeadings, { NestedHeading } from "@/utils/getNestedHeading";

const useHeadingsData = () => {
    const [nestedHeadings, setNestedHeadings] = useState<NestedHeading[]>([]);

    useEffect(() => {
        const headingElements = Array.from(
            document.querySelectorAll("h2, h3")
        ) as HTMLElement[];

        const newNestedHeadings = getNestedHeadings(headingElements);
        setNestedHeadings(newNestedHeadings);
    }, []);

    return { nestedHeadings };
};

export default useHeadingsData;

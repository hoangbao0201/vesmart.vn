'use client';

import Image from "next/image";

const brands = [
    {
        name: "Ecovacs",
        logo: "/static/images/slide-brand/logo-ecovacs.png",
    },
    {
        name: "Roborock",
        logo: "/static/images/slide-brand/logo-roborock.png",
    },
    {
        name: "Xiaomi",
        logo: "/static/images/slide-brand/logo-xiaomi.png",
    },
    {
        name: "Dreame",
        logo: "/static/images/slide-brand/logo-dreame.png",
    },
    {
        name: "Irobot",
        logo: "/static/images/slide-brand/logo-irobot.png",
    },
    {
        name: "Dyson",
        logo: "/static/images/slide-brand/logo-dyson.png",
    },
];

export default function BrandCarousel() {
    const duplicatedBrands = [...brands, ...brands];

    return (
        <div className="overflow-hidden bg-white">
            <div className="py-4 relative flex animate-scroll">
                {duplicatedBrands.map((brand, index) => (
                    <div
                        key={`${brand.name}-${index}`}
                        className="flex-shrink-0 px-8 flex items-center justify-center"
                    >
                        <div className="relative w-full h-10 flex items-center justify-center">
                            <Image
                                unoptimized
                                width={200}
                                height={80}
                                src={brand?.logo}
                                alt={brand?.name}
                                className="object-contain h-10 w-auto"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


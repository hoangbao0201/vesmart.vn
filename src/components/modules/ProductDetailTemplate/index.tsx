'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import MarkContent from "@/components/share/MarkContent";
import IconCart from "../../icons/IconCart";
import IconLocationDot from "../../icons/IconLocationDot";
import ProductGallery from "./ProductGallery";
import { IGetProductDetail } from "@/services/product/product.type";
import { useAppDispatch } from "@/store/hooks";
import { addItemToCart, CartSelectedOption } from "@/store/cart";
import convertPrice from "@/utils/convertPrice";
import { useRouter } from "next/navigation";
import { SITE_CONFIG } from "@/configs/site.config";

interface ProductDetailTemplateProps {
    product: IGetProductDetail;
}

type SelectedOptionMap = Record<string, string>;

type ProductVariant = IGetProductDetail["variants"][number];

const buildDefaultSelections = (product: IGetProductDetail): SelectedOptionMap => {
    const firstVariant = product.variants[0];

    if (firstVariant?.optionValues?.length) {
        return firstVariant.optionValues.reduce<SelectedOptionMap>((acc, item) => {
            acc[item.productOptionValue.productOptionId] = item.productOptionValue.slug;
            return acc;
        }, {});
    }

    return product.options.reduce<SelectedOptionMap>((acc, option) => {
        const firstValue = option.values[0];
        if (firstValue) {
            acc[option.productOptionId] = firstValue.slug;
        }
        return acc;
    }, {});
};

const findMatchingVariant = (
    variants: IGetProductDetail["variants"],
    options: IGetProductDetail["options"],
    selectedOptions: SelectedOptionMap,
): ProductVariant | null => {
    if (!variants.length) return null;
    if (!options.length) return variants[0];

    const hasAllSelections = options.every((option) => Boolean(selectedOptions[option.productOptionId]));
    if (!hasAllSelections) return null;

    return (
        variants.find((variant) =>
            options.every((option) => {
                const selectedSlug = selectedOptions[option.productOptionId];
                return variant.optionValues.some(
                    (optionValue) =>
                        optionValue.productOptionValue.productOptionId === option.productOptionId &&
                        optionValue.productOptionValue.slug === selectedSlug,
                );
            }),
        ) ?? null
    );
};

const ProductDetailTemplate = ({ product }: ProductDetailTemplateProps) => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const [thumbsSwiper, setThumbsSwiper] = useState<number>(0);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptionMap>({});
    const [buyQuantity, setBuyQuantity] = useState<number>(1);

    useEffect(() => {
        setSelectedOptions(buildDefaultSelections(product));
    }, [product]);

    const selectedVariant = useMemo(
        () => findMatchingVariant(product.variants, product.options, selectedOptions),
        [product, selectedOptions],
    );

    const displayPrice = selectedVariant?.price ?? product.variants[0]?.price ?? 0;
    const displayQuantity = selectedVariant?.quantity ?? 0;
    const mustChooseOptions = product.options.length > 0 && !selectedVariant;
    const maxBuyQuantity = mustChooseOptions ? 0 : displayQuantity;

    useEffect(() => {
        if (maxBuyQuantity <= 0) {
            setBuyQuantity(0);
            return;
        }

        setBuyQuantity((prev) => {
            if (prev <= 0) return 1;
            if (prev > maxBuyQuantity) return maxBuyQuantity;
            return prev;
        });
    }, [maxBuyQuantity]);

    const handleAddProductToCart = () => {
        if (mustChooseOptions || !selectedVariant || buyQuantity <= 0) {
            return;
        }

        const selectedOptionMapById = new Map(
            selectedVariant.optionValues.map((value) => [
                value.productOptionValue.productOptionId,
                value.productOptionValue,
            ]),
        );

        const selectedOptionDetails: CartSelectedOption[] = product.options
            .map((option) => {
                const selectedValue = selectedOptionMapById.get(option.productOptionId);
                if (!selectedValue) {
                    return null;
                }

                return {
                    optionId: option.productOptionId,
                    optionName: option.name,
                    valueSlug: selectedValue.slug,
                    valueLabel: selectedValue.value,
                };
            })
            .filter((item): item is CartSelectedOption => item !== null);

        const variantImage =
            selectedVariant.images.find((image) => Boolean(image.image?.url))?.image?.url ??
            product.images.find((image) => Boolean(image.image?.url))?.image?.url ??
            null;

        const itemKey = `${product.productId}:${selectedVariant.productVariantId}`;

        dispatch(
            addItemToCart({
                item: {
                    itemKey,
                    productId: product.productId,
                    productSlug: product.slug,
                    productName: product.name,
                    productImage: variantImage,
                    variantId: selectedVariant.productVariantId,
                    variantPrice: selectedVariant.price,
                    variantDiscountPercent: selectedVariant.discountPercent,
                    variantStock: selectedVariant.quantity,
                    selectedOptions: selectedOptionDetails,
                },
                quantity: buyQuantity,
            }),
        );
    }

    const handleBuyNow = () => {
        handleAddProductToCart();
        router.push(`/gio-hang`);
    };

    const handleChangeVariant = (optionId: string, valueSlug: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [optionId]: valueSlug,
        }));
    }

    const handleChangeBuyQuantity = (nextValue: number) => {
        if (maxBuyQuantity <= 0) {
            setBuyQuantity(0);
            return;
        }

        const safeValue = Number.isFinite(nextValue) ? nextValue : 1;
        const normalizedValue = Math.floor(safeValue);
        const clampedValue = Math.min(Math.max(normalizedValue, 1), maxBuyQuantity);
        setBuyQuantity(clampedValue);
    };

    return (
        <div>
            <div className="md:px-3 py-4 container mx-auto max-w-7xl">
                <BreadcrumbNav
                    className="mb-4 px-3"
                    items={[
                        { name: "Trang chủ", path: "/" },
                        { name: "Sản phẩm", path: "/san-pham" },
                        { name: product.name },
                    ]}
                />
                <div className="lg:flex py-7 bg-white">
                    {/* Product Gallery */}
                    <div className="relative lg:w-4/12 px-3 mb-3">
                        <ProductGallery
                            images={product.images}
                            productName={product.name}
                            thumbsSwiper={thumbsSwiper}
                            setThumbsSwiper={setThumbsSwiper}
                        />
                    </div>

                    {/* Product Info */}
                    <div className="relative lg:w-8/12 px-3 mb-3">
                        <div className="mb-4">
                            <h1 className="font-semibold text-2xl">
                                {product?.name}
                            </h1>
                        </div>

                        <div className="p-4 mb-4 bg-gray-100 flex items-end leading-none">
                            <div className="font-semibold text-[30px] text-rose-500 mr-3">
                                {convertPrice(displayPrice)}
                            </div>
                        </div>

                        <div className="mb-3">
                            {
                                product?.options.map((option) => {
                                    return (
                                        <div key={option.productOptionId}>
                                            <h2 className="font-semibold mb-2 text-base">{option.name}</h2>
                                            <div className="flex flex-wrap gap-2">
                                                {
                                                    option.values.map((value) => {
                                                        const isSelected =
                                                            selectedOptions[option.productOptionId] === value.slug;
                                                        return (
                                                            <button
                                                                type="button"
                                                                key={value.productOptionValueId}
                                                                className={`border rounded-md px-4 py-2 cursor-pointer transition-colors ${isSelected
                                                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                                                    : "border-gray-200 bg-gray-100 hover:bg-gray-200"
                                                                    }`}
                                                                onClick={() => handleChangeVariant(option.productOptionId, value.slug)}
                                                            >
                                                                <span className="font-medium">{value.value}</span>
                                                            </button>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {/* <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm overflow-auto">
                                {JSON.stringify(selectedVariant, null, 2)}
                            </pre> */}
                        </div>

                        <div className="mb-4">
                            {!mustChooseOptions && (
                                <div className="text-sm text-gray-600 pb-1">
                                    Còn lại: {displayQuantity} sản phẩm
                                </div>
                            )}
                        </div>

                        {mustChooseOptions && (
                            <div className="mb-4 text-sm text-red-600">
                                Không tìm thấy biến thể phù hợp với lựa chọn hiện tại.
                            </div>
                        )}

                        <div className="mb-4 flex flex-wrap whitespace-nowrap">
                            <p className="sm:w-2/12 w-3/12">Số lượng: </p>
                            <div className="flex items-center flex-1 flex-wrap">
                                <button
                                    type="button"
                                    aria-label="Giảm số lượng"
                                    disabled={buyQuantity <= 1}
                                    onClick={() => handleChangeBuyQuantity(buyQuantity - 1)}
                                    className={`border border-gray-200 h-10 px-4 rounded-l-md text-xl ${buyQuantity <= 1 ? "bg-gray-100 opacity-90 cursor-not-allowed" : "bg-white cursor-pointer"}`}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min={maxBuyQuantity > 0 ? 1 : 0}
                                    value={buyQuantity}
                                    max={maxBuyQuantity}
                                    disabled={maxBuyQuantity <= 0}
                                    onChange={(e) => handleChangeBuyQuantity(Number(e.target.value))}
                                    className="w-16 h-10 outline-none border-t border-b border-gray-200 text-center focus:border-gray-300 bg-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                                <button
                                    type="button"
                                    aria-label="Tăng số lượng"
                                    disabled={buyQuantity >= maxBuyQuantity}
                                    onClick={() => handleChangeBuyQuantity(buyQuantity + 1)}
                                    className={`border border-gray-200 h-10 px-4 rounded-r-md text-xl mr-3 ${buyQuantity >= maxBuyQuantity ? "bg-gray-100 opacity-90 cursor-not-allowed" : "bg-white cursor-pointer"}`}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex mb-4 max-w-[500px]">
                            <button
                                onClick={handleAddProductToCart}
                                disabled={mustChooseOptions}
                                className={`cursor-pointer py-3 px-1 rounded-lg flex items-center justify-center space-x-2 border text-white uppercase font-semibold select-none w-2/3 mr-2 ${mustChooseOptions
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700/90"
                                    }`}
                            >
                                <IconCart className="w-5 h-5 fill-white" /> <span>Thêm vào giỏ hàng</span>
                            </button>
                            <button
                                onClick={handleBuyNow}
                                disabled={mustChooseOptions}
                                className={`cursor-pointer py-3 px-1 rounded-lg border text-white uppercase font-semibold select-none w-1/3 ${mustChooseOptions
                                    ? "bg-red-400 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700/90"
                                    }`}
                            >
                                Mua ngay
                            </button>
                        </div>

                        <section className="mb-5 bg-gray-100 border border-blue-600 border-dashed rounded-md px-4 py-4" aria-labelledby="store-heading">

                            <div className="mb-5">
                                <h2 id="store-heading" className="mb-2 font-medium text-base">Hệ thống cửa hàng</h2>
                                <div className="flex items-center space-x-2 mb-1">
                                    <IconLocationDot className="w-5 h-5 shrink-0 fill-red-600" />
                                    <span>634/24 Trưng Nữ Vương, phường Hòa Thuận Tây, Đà Nẵng, Việt Nam</span>
                                </div>
                            </div>

                            <div>
                                <h2 className="mb-3 font-medium text-base">Liên hệ mua hàng</h2>
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

                        </section>
                    </div>
                </div>

                <div className="pt-4">
                    <div className="px-3 py-4 bg-white">
                        {product?.generalInfo && (
                            <section className="mb-4" aria-labelledby="general-info-heading">
                                <h2 id="general-info-heading" className="mb-2 font-medium text-lg">Thông tin chung</h2>
                                <MarkContent>{product?.generalInfo}</MarkContent>
                            </section>
                        )}
                        {
                            product?.promotionContent && (
                                <section className="mb-4" aria-labelledby="promo-heading">
                                    <h2 id="promo-heading" className="mb-2 font-medium text-lg">Ưu đãi</h2>
                                    <MarkContent>{product?.promotionContent}</MarkContent>
                                </section>
                            )
                        }
                        {
                            product?.warrantyContent && (
                                <section className="mb-4" aria-labelledby="warranty-heading">
                                    <h2 id="warranty-heading" className="mb-2 font-medium text-lg">Bảo hành</h2>
                                    <MarkContent>{product?.warrantyContent}</MarkContent>
                                </section>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailTemplate;
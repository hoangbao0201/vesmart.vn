/**
 * Import dữ liệu từ script/data/*.json (Mongo Extended JSON) vào các collection Prisma *V2.
 * Chạy từ thư mục fe: pnpm import:v2
 */
import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import {
  PrismaClient,
  UserRoleEnum,
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentMethodEnum,
} from "../generated/prisma";

const prisma = new PrismaClient();

/** Chạy từ thư mục `fe` (pnpm import:v2). */
const DATA_DIR = path.join(process.cwd(), "script", "data");

function reviveEjson(_key: string, value: unknown): unknown {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const o = value as Record<string, unknown>;
    const keys = Object.keys(o);
    if (keys.length === 1 && "$oid" in o) return o.$oid as string;
    if (keys.length === 1 && "$date" in o) return new Date(o.$date as string);
    if (keys.length === 1 && "$numberLong" in o) return Number(o.$numberLong);
  }
  return value;
}

function loadJson<T>(filename: string): T {
  const p = path.join(DATA_DIR, filename);
  if (!fs.existsSync(p)) {
    console.warn(`[skip] Missing data file: ${filename}`);
    return [] as T;
  }
  const raw = fs.readFileSync(p, "utf-8");
  return JSON.parse(raw, reviveEjson) as T;
}

function num(v: unknown, fallback: number): number {
  if (v === null || v === undefined) return fallback;
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  return Number(v) || fallback;
}

function mapUserRole(raw: string): UserRoleEnum {
  const k = raw.toLowerCase();
  if (k === "guest") return UserRoleEnum.GUEST;
  if (k === "admin") return UserRoleEnum.ADMIN;
  throw new Error(`Unknown user role in export: ${raw}`);
}

function mapOrderStatus(raw: string): OrderStatusEnum {
  const k = raw.toLowerCase();
  const m: Record<string, OrderStatusEnum> = {
    pending: OrderStatusEnum.PENDING,
    confirmed: OrderStatusEnum.CONFIRMED,
    processing: OrderStatusEnum.PROCESSING,
    shipping: OrderStatusEnum.SHIPPING,
    delivered: OrderStatusEnum.DELIVERED,
    cancelled: OrderStatusEnum.CANCELLED,
  };
  const v = m[k];
  if (!v) throw new Error(`Unknown order status: ${raw}`);
  return v;
}

function mapPaymentStatus(raw: string): PaymentStatusEnum {
  const k = raw.toLowerCase();
  const m: Record<string, PaymentStatusEnum> = {
    pending: PaymentStatusEnum.PENDING,
    paid: PaymentStatusEnum.PAID,
    failed: PaymentStatusEnum.FAILED,
    refunded: PaymentStatusEnum.REFUNDED,
  };
  const v = m[k];
  if (!v) throw new Error(`Unknown payment status: ${raw}`);
  return v;
}

function mapPaymentMethod(raw: string): PaymentMethodEnum {
  const k = raw.toLowerCase();
  const m: Record<string, PaymentMethodEnum> = {
    cod: PaymentMethodEnum.COD,
    wallet: PaymentMethodEnum.WALLET,
    credit_card: PaymentMethodEnum.CREDIT_CARD,
    bank_transfer: PaymentMethodEnum.BANK_TRANSFER,
  };
  const v = m[k];
  if (!v) throw new Error(`Unknown payment method: ${raw}`);
  return v;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function main() {
  type Doc = Record<string, unknown>;

  const users = loadJson<Doc[]>("vesmart-db.users.json");
  const images = loadJson<Doc[]>("vesmart-db.images.json");
  const products = loadJson<Doc[]>("vesmart-db.products.json");
  const productImages = loadJson<Doc[]>("vesmart-db.product_images.json");
  const productOptions = loadJson<Doc[]>("vesmart-db.product_options.json");
  const productOptionValues = loadJson<Doc[]>("vesmart-db.product_option_values.json");
  const productVariants = loadJson<Doc[]>("vesmart-db.product_variants.json");
  const variantOptionValues = loadJson<Doc[]>("vesmart-db.variant_option_values.json");
  const orders = loadJson<Doc[]>("vesmart-db.orders.json");
  const orderItems = loadJson<Doc[]>("vesmart-db.order_items.json");
  const hashtags = loadJson<Doc[]>("vesmart-db.Hashtag.json");
  const blogs = loadJson<Doc[]>("vesmart-db.Blog.json");
  const blogHashtags = loadJson<Doc[]>("vesmart-db.BlogHashtag.json");

  console.log("Importing UserV2…", users.length);
  for (const batch of chunk(users, 100)) {
    await prisma.userV2.createMany({
      data: batch.map((d) => ({
        userId: d._id as string,
        email: (d.email as string | null) ?? null,
        phone: (d.phone as string | null) ?? null,
        password: (d.password as string | null) ?? null,
        name: d.name as string,
        role: mapUserRole(String(d.role ?? "guest")),
        createdAt: d.created_at as Date,
        updatedAt: d.updated_at as Date,
      })),
    });
  }

  console.log("Importing ImageV2…", images.length);
  for (const batch of chunk(images, 100)) {
    await prisma.imageV2.createMany({
      data: batch.map((d) => ({
        imageId: d._id as string,
        imageType: (d.image_type as string | null) ?? null,
        width: d.width != null ? num(d.width, 0) : null,
        height: d.height != null ? num(d.height, 0) : null,
        index: num(d.index, 1),
        url: d.url as string,
        source: (d.source as string | null) ?? null,
        description: (d.description as string | null) ?? null,
        dominantColor: (d.dominant_color as string | null) ?? null,
        createdAt: d.created_at as Date,
        updatedAt: d.updated_at as Date,
      })),
    });
  }

  console.log("Importing ProductV2…", products.length);
  for (const batch of chunk(products, 100)) {
    await prisma.productV2.createMany({
      data: batch.map((d) => ({
        productId: d._id as string,
        name: d.name as string,
        slug: (d.slug as string | null | undefined) ?? null,
        generalInfo: (d.general_info as string | null) ?? null,
        promotionContent: (d.promotion_content as string | null) ?? null,
        warrantyContent: (d.warranty_content as string | null) ?? null,
        isFeatured: Boolean(d.is_featured),
        createdById: d.created_by_id as string,
        createdAt: d.created_at as Date,
        updatedAt: d.updated_at as Date,
      })),
    });
  }

  console.log("Importing ProductImageV2…", productImages.length);
  for (const batch of chunk(productImages, 100)) {
    await prisma.productImageV2.createMany({
      data: batch.map((d) => ({
        productImageId: d._id as string,
        productId: d.product_id as string,
        imageId: d.image_id as string,
        index: num(d.index, 0),
      })),
    });
  }

  console.log("Importing ProductOptionV2…", productOptions.length);
  for (const batch of chunk(productOptions, 100)) {
    await prisma.productOptionV2.createMany({
      data: batch.map((d) => ({
        productOptionId: d._id as string,
        productId: d.product_id as string,
        name: d.name as string,
        slug: d.slug as string,
        createdAt: d.created_at as Date,
        updatedAt: d.updated_at as Date,
      })),
    });
  }

  console.log("Importing ProductOptionValueV2…", productOptionValues.length);
  for (const batch of chunk(productOptionValues, 100)) {
    await prisma.productOptionValueV2.createMany({
      data: batch.map((d) => ({
        productOptionValueId: d._id as string,
        value: d.value as string,
        slug: d.slug as string,
        createdAt: d.created_at as Date,
        updatedAt: d.updated_at as Date,
        productOptionId: d.product_option_id as string,
      })),
    });
  }

  console.log("Importing ProductVariantV2…", productVariants.length);
  for (const batch of chunk(productVariants, 100)) {
    await prisma.productVariantV2.createMany({
      data: batch.map((d) => ({
        productVariantId: d._id as string,
        price: num(d.price, 0),
        quantity: num(d.quantity, 0),
        discountPercent:
          d.discount_percent === null || d.discount_percent === undefined
            ? null
            : num(d.discount_percent, 0),
        specificInfo: (d.specific_info as string | null) ?? null,
        createdAt: d.created_at as Date,
        updatedAt: d.updated_at as Date,
        productId: d.product_id as string,
      })),
    });
  }

  console.log("Importing VariantOptionValueV2…", variantOptionValues.length);
  for (const batch of chunk(variantOptionValues, 100)) {
    await prisma.variantOptionValueV2.createMany({
      data: batch.map((d) => ({
        variantOptionValueId: d._id as string,
        productVariantId: d.product_variant_id as string,
        productOptionValueId: d.value_id as string,
      })),
    });
  }

  console.log("Importing OrderV2…", orders.length);
  for (const batch of chunk(orders, 50)) {
    await prisma.orderV2.createMany({
      data: batch.map((d) => ({
        orderId: d._id as string,
        status: mapOrderStatus(String(d.status)),
        paymentStatus: mapPaymentStatus(String(d.payment_status)),
        paymentMethod:
          d.payment_method != null && d.payment_method !== ""
            ? mapPaymentMethod(String(d.payment_method))
            : null,
        subtotal: num(d.subtotal, 0),
        shippingFee: num(d.shipping_fee, 0),
        discount: num(d.discount, 0),
        total: num(d.total, 0),
        shippingName: d.shipping_name as string,
        shippingPhone: d.shipping_phone as string,
        shippingEmail: (d.shipping_email as string | null) ?? null,
        shippingAddress: d.shipping_address as string,
        shippingCity: (d.shipping_city as string | null) ?? null,
        shippingDistrict: (d.shipping_district as string | null) ?? null,
        shippingWard: (d.shipping_ward as string | null) ?? null,
        shippingNote: (d.shipping_note as string | null) ?? null,
        paymentTransactionId: (d.payment_transaction_id as string | null) ?? null,
        paidAt: (d.paid_at as Date | null) ?? null,
        shippedAt: (d.shipped_at as Date | null) ?? null,
        deliveredAt: (d.delivered_at as Date | null) ?? null,
        cancelledAt: (d.cancelled_at as Date | null) ?? null,
        cancellationReason: (d.cancellation_reason as string | null) ?? null,
        createdAt: d.created_at as Date,
        updatedAt: d.updated_at as Date,
        userId: (d.user_id as string | null | undefined) ?? null,
      })),
    });
  }

  console.log("Importing OrderItemV2…", orderItems.length);
  for (const batch of chunk(orderItems, 100)) {
    await prisma.orderItemV2.createMany({
      data: batch.map((d) => ({
        orderItemId: d._id as string,
        productName: d.product_name as string,
        variantAttributes: (d.variant_attributes as string | null) ?? null,
        unitPrice: num(d.unit_price, 0),
        discountPercent:
          d.discount_percent === null || d.discount_percent === undefined
            ? null
            : num(d.discount_percent, 0),
        quantity: num(d.quantity, 1),
        subtotal: num(d.subtotal, 0),
        createdAt: d.created_at as Date,
        updatedAt: d.updated_at as Date,
        orderId: d.order_id as string,
        productVariantId: d.product_variant_id as string,
      })),
    });
  }

  console.log("Importing MetaV2 (from Hashtag)…", hashtags.length);
  const existingMetaIds = new Set(
    (
      await prisma.metaV2.findMany({
        select: { metaId: true },
      })
    ).map((m) => m.metaId),
  );
  const newHashtags = hashtags.filter((d) => !existingMetaIds.has(d._id as string));
  for (const batch of chunk(newHashtags, 100)) {
    await prisma.metaV2.createMany({
      data: batch.map((d) => ({
        metaId: d._id as string,
        name: d.name as string,
      })),
    });
  }

  console.log("Importing PostV2 (from Blog)…", blogs.length);
  const existingPosts = await prisma.postV2.findMany({
    select: { postId: true, slug: true },
  });
  const existingPostIds = new Set(existingPosts.map((p) => p.postId));
  const existingPostSlugs = new Set(existingPosts.map((p) => p.slug));
  const newBlogs = blogs.filter((d) => {
    const id = d._id as string;
    const slug = d.slug as string;
    return !existingPostIds.has(id) && !existingPostSlugs.has(slug);
  });
  for (const batch of chunk(newBlogs, 50)) {
    await prisma.postV2.createMany({
      data: batch.map((d) => ({
        postId: d._id as string,
        userId: d.authorId as string,
        slug: d.slug as string,
        title: d.title as string,
        content: d.content as string,
        description: (d.description as string | null) ?? null,
        createdAt: d.createdAt as Date,
        updatedAt: d.updatedAt as Date,
      })),
    });
  }

  console.log("Importing PostMetaV2 (from BlogHashtag)…", blogHashtags.length);
  const existingPostMetas = await prisma.postMetaV2.findMany({
    select: { postId: true, metaId: true, postMetaId: true },
  });
  const existingPostMetaIds = new Set(existingPostMetas.map((pm) => pm.postMetaId));
  const existingPostMetaPairs = new Set(
    existingPostMetas.map((pm) => `${pm.postId}::${pm.metaId}`),
  );
  const seenNewPostMetaIds = new Set<string>();
  const seenNewPostMetaPairs = new Set<string>();
  const newBlogHashtags = blogHashtags.filter((d) => {
    const postMetaId = d._id as string;
    const postId = d._blogId as string;
    const metaId = d._hashtagId as string;
    const pair = `${postId}::${metaId}`;
    const shouldKeep =
      !existingPostMetaIds.has(postMetaId) &&
      !existingPostMetaPairs.has(pair) &&
      !seenNewPostMetaIds.has(postMetaId) &&
      !seenNewPostMetaPairs.has(pair);

    if (shouldKeep) {
      seenNewPostMetaIds.add(postMetaId);
      seenNewPostMetaPairs.add(pair);
    }

    return shouldKeep;
  });
  for (const batch of chunk(newBlogHashtags, 200)) {
    await prisma.postMetaV2.createMany({
      data: batch.map((d) => ({
        postMetaId: d._id as string,
        postId: d._blogId as string,
        metaId: d._hashtagId as string,
      })),
    });
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
